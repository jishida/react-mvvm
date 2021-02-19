import {
  AsyncViewModelValidatorOptions,
  SyncOrAsync,
  Validatable,
  ValidatorBase,
  ViewModelValidator,
  ViewModelValidatorItem,
  ViewModelValidatorOptions,
} from '../../validators';
import _ValidationBase from './ValidationBase';
import { _argsToArray, _ViewModelObject } from '../../core';

function increment(
  map: Map<ValidatorBase, number>,
  validator: ValidatorBase<any>
) {
  const count = map.get(validator) || 0;
  map.set(validator, count + 1);
  return !count;
}

function decrement(
  map: Map<ValidatorBase, number>,
  validator: ValidatorBase<any>
) {
  const count = map.get(validator)!;
  const empty = count < 2;
  if (empty) {
    map.delete(validator);
  } else {
    map.set(validator, count - 1);
  }
  return empty;
}

export default abstract class _ViewModelValidatorBase<Async extends boolean>
  extends _ValidationBase
  implements ViewModelValidator<Async> {
  private readonly _registry: Map<
    ViewModelValidatorItem<Async>,
    ValidatorBase<any>[]
  > = new Map();

  private readonly _counterMap: Map<ValidatorBase<any>, number> = new Map();

  private _mask: number = 0x50;

  protected readonly _validatorClasses: Array<
    new (...args: any[]) => ValidatorBase<any>
  > = [];

  constructor(
    options?: ViewModelValidatorOptions | AsyncViewModelValidatorOptions
  ) {
    super();
    if (options) {
      if (options.async) {
        this._mask = 0x10;
      }
      this.configure(options);
    }
  }

  protected get _validators() {
    const validators: ValidatorBase<any>[] = [];
    this._counterMap.forEach((_, validator) => {
      if (validator.enabled) {
        validators.push(validator);
      }
    });
    return validators;
  }

  private _isAvailableObject(obj: any): obj is Validatable<any, any> {
    return obj instanceof _ViewModelObject && (obj.spec & this._mask) === 0x10;
  }

  private _isAvailableValidator(instance: any): instance is ValidatorBase {
    return this._validatorClasses.some((cls) => instance instanceof cls);
  }

  private _pushValidatorIfAvailable(
    validators: ValidatorBase<any>[],
    item: any
  ) {
    if (this._isAvailableObject(item)) {
      validators.push(item.validator);
    } else if (this._isAvailableValidator(item)) {
      validators.push(item);
    } else {
      return false;
    }
    return true;
  }

  register() {
    const registry = this._registry;
    const counterMap = this._counterMap;
    // eslint-disable-next-line prefer-rest-params
    _argsToArray(arguments)
      .filter((item) => item && typeof item === 'object' && !registry.has(item))
      .forEach((item) => {
        const validators: ValidatorBase<any>[] = [];
        if (!this._pushValidatorIfAvailable(validators, item)) {
          if (Array.isArray(item)) {
            item.forEach((o) => {
              this._pushValidatorIfAvailable(validators, o);
            });
          } else {
            Object.keys(item).forEach((name) => {
              const prop = item[name];
              if (this._isAvailableObject(prop)) {
                validators.push(prop.validator);
              }
            });
          }
        }
        if (validators.length) {
          registry.set(item, validators);
          validators.forEach((validator) => {
            if (
              increment(counterMap, validator) &&
              validator.strategy === 'inherit' &&
              !validator.parent
            ) {
              validator.configure({ parent: this });
            }
          });
        }
      });
    return this;
  }

  unregister() {
    const registry = this._registry;
    // eslint-disable-next-line prefer-rest-params
    _argsToArray(arguments).forEach((item) => {
      const validators = registry.get(item);
      if (validators) {
        validators.forEach((validator) => {
          if (
            decrement(this._counterMap, validator) &&
            validator.parent === this
          ) {
            validator.configure({});
          }
        });
        registry.delete(item);
      }
    });
    return this;
  }

  abstract validate(): SyncOrAsync<boolean, Async>;

  reset() {
    this._counterMap.forEach((_, validator) => {
      validator.reset();
    });
  }
}
