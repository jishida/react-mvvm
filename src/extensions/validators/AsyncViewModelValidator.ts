import { AsyncViewModelValidatorOptions } from '../../validators';
import _AsyncObjectValidator from './AsyncObjectValidator';
import _ObjectValidator from './ObjectValidator';
import _ViewModelValidator from './ViewModelValidator';
import _ViewModelValidatorBase from './ViewModelValidatorBase';

export default class _AsyncViewModelValidator extends _ViewModelValidatorBase<true> {
  private _parallel: boolean = false;

  constructor(options: AsyncViewModelValidatorOptions) {
    super(options);
    this._parallel = !!options.parallel;
    this._validatorClasses.push(
      _ObjectValidator,
      _AsyncObjectValidator,
      _ViewModelValidator,
      _AsyncViewModelValidator
    );
  }

  _validateSequential() {
    let ok = true;
    return this._validators
      .reduce<Promise<void>>(
        (promise, validator) =>
          promise.then(() => {
            const result = validator.validate();
            if (result instanceof Promise) {
              return result.then((r) => {
                if (!r) {
                  ok = false;
                }
              });
            }
            if (!result) {
              ok = false;
            }
            return undefined;
          }),
        Promise.resolve()
      )
      .then(() => ok);
  }

  _validateParallel() {
    let ok = true;
    return Promise.all(
      this._validators.map((validator) =>
        new Promise((resolve) => {
          resolve(validator.validate());
        }).then((v) => {
          if (!v) {
            ok = false;
          }
        })
      )
    ).then(() => ok);
  }

  validate() {
    this._lazy = false;
    return this._parallel
      ? this._validateParallel()
      : this._validateSequential();
  }
}
