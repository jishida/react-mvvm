import {
  ComputedArgs,
  Computed,
  ComputedOptions,
  DependencyTuple,
  DependencyValue,
  Mandatory,
  Observable,
  ObservableOptions,
  Optional,
  Ref,
  Result,
  ViewModelObject,
} from './interfaces';
import { Hooks } from './hooks';
import { BindComponent, DOMBindComponent } from './views';
import {
  _assign, // extensions line
  _getObservableClass,
  _setHooks,
  _useBind,
  _createBindComponent,
  _ViewModelObject,
  _Ref,
  _argsToArray,
  _getComputedClass,
  _setToArray,
  _Observable,
} from './core';
// begin extensions scope
import { ResolvedObject } from './proxy';
import { ProxyFunc } from './proxy-func';
import {
  AsyncResult,
  AsyncValidatable,
  AsyncViewModelValidator,
  AsyncViewModelValidatorOptions,
  ParsableOptions,
  SyncOrAsync,
  Validatable,
  ValidatableOptions,
  ValidationOptions,
  ViewModelValidator,
  ViewModelValidatorOptions,
} from './validators';
import { _proxy } from './extensions/proxy';
import {
  _AsyncViewModelValidator,
  _getParsableClass,
  _getValidatableClass,
  _isValidationOptionsKey,
  _ViewModelValidator,
} from './extensions/validators';
// end extensions scope

export * from './interfaces';
export * from './hooks';
export * from './views';

export const Bind: BindComponent = _createBindComponent();
Bind.displayName = 'Bind';

export const DOMBind: DOMBindComponent = _createBindComponent();
DOMBind.displayName = 'DOMBind';

export function setHooks(hooks: Hooks) {
  _setHooks(hooks);
}

export function isViewModelObject(value: any): value is ViewModelObject {
  return value instanceof _ViewModelObject;
}

// useBind overload
export function useBind(
  ...observables: ReadonlyArray<DependencyValue<any>>
): void;

// useBind implementation
export function useBind() {
  // eslint-disable-next-line prefer-rest-params
  const values: DependencyValue<any>[] = _argsToArray(arguments);
  _useBind(
    _setToArray(
      values.reduce((observableSet, value) => {
        value.deps.forEach((dep) => {
          if (dep instanceof _Observable) {
            observableSet.add(dep);
          }
        });
        return observableSet;
      }, new Set<_Observable<any>>())
    )
  );
}

export function ref<E = HTMLElement>() {
  return new _Ref() as Ref<E>;
}
// computed overloads
export function computed<V, D extends DependencyTuple>(
  computeFn: (...args: ComputedArgs<D>) => V,
  deps: D,
  options?: Optional<'result', true> & Optional<'ref', false>
): Computed<V> & Result<V>;
export function computed<V, D extends DependencyTuple>(
  computeFn: (...args: ComputedArgs<D>) => V,
  deps: D,
  options: Mandatory<'result', false> & Optional<'ref', false>
): Computed<V>;

export function computed<V, D extends DependencyTuple, E = HTMLElement>(
  computeFn: (...args: ComputedArgs<D>) => V,
  deps: D,
  options: Mandatory<'ref', true> & Optional<'result', true>
): Computed<V> & Result<V> & Ref<E>;
export function computed<V, D extends DependencyTuple, E = HTMLElement>(
  computeFn: (...args: ComputedArgs<D>) => V,
  deps: D,
  options: Mandatory<'result', false> & Mandatory<'ref', true>
): Computed<V> & Ref<E>;

// computed implementation
export function computed<V, D extends DependencyTuple>(
  computeFn: (...args: ComputedArgs<D>) => V,
  deps: D,
  options?: ComputedOptions
) {
  const ComputedClass = _getComputedClass<V, D>(options);
  return new ComputedClass(options, computeFn, deps);
}

// observable overloads
export function observable<V>(
  initialValue: V,
  options?: Optional<'ref', false> & Optional<'result', true>
): Observable<V> & Result<V>;

export function observable<V>(
  initialValue: V,
  options: Optional<'ref', false> & Mandatory<'result', false>
): Observable<V>;

export function observable<V, E = HTMLElement>(
  initialValue: V,
  options: Mandatory<'ref', true> & Optional<'result', true>
): Observable<V> & Result<V> & Ref<E>;

export function observable<V, E = HTMLElement>(
  initialValue: V,
  options: Mandatory<'ref', true> & Mandatory<'result', false>
): Observable<V> & Ref<E>;

// observable implementation
export function observable<V>(initialValue?: V, options?: ObservableOptions) {
  const ObservableClass = _getObservableClass<V>(options);
  return new ObservableClass({
    _initialValue: initialValue!,
  }) as Observable<V>;
}

// begin extensions scope

export * from './validators';
export * from './proxy';

// synchronous validatable overloads
export function validatable<V>(
  initialValue: V,
  validateFn: (value: V) => boolean | void,
  options?: Optional<'result', true> &
    Optional<'ref' | 'async', false> &
    ValidationOptions
): Validatable<V> & Result<V>;

export function validatable<V>(
  initialValue: V,
  validateFn: (value: V) => boolean | void,
  options: Mandatory<'result', false> &
    Optional<'ref' | 'async', false> &
    ValidationOptions
): Validatable<V>;

export function validatable<V, E = HTMLElement>(
  initialValue: V,
  validateFn: (value: V) => boolean | void,
  options: Mandatory<'ref', true> &
    Optional<'result', true> &
    Optional<'async', false> &
    ValidationOptions
): Validatable<V> & Result<V> & Ref<E>;

export function validatable<V, E = HTMLElement>(
  initialValue: V,
  validateFn: (value: V) => boolean | void,
  options: Mandatory<'ref', true> &
    Mandatory<'result', false> &
    Optional<'async', false> &
    ValidationOptions
): Validatable<V> & Ref<E>;

// asynchronous validatable overloads
export function validatable<V>(
  initialValue: V,
  validateFn: (value: V) => Promise<boolean | void>,
  options: Mandatory<'async', true> &
    Optional<'result', true> &
    Optional<'ref', false> &
    ValidationOptions
): AsyncValidatable<V> & AsyncResult<V>;

export function validatable<V>(
  initialValue: V,
  validateFn: (value: V) => Promise<boolean | void>,
  options: Mandatory<'async', true> &
    Mandatory<'result', false> &
    Optional<'ref', false> &
    ValidationOptions
): AsyncValidatable<V>;

export function validatable<V, E = HTMLElement>(
  initialValue: V,
  validateFn: (value: V) => Promise<boolean | void>,
  options: Mandatory<'ref' | 'async', true> &
    Optional<'result', true> &
    ValidationOptions
): AsyncValidatable<V> & AsyncResult<V> & Ref<E>;

export function validatable<V, E = HTMLElement>(
  initialValue: V,
  validateFn: (value: V) => Promise<boolean | void>,
  options: Mandatory<'ref' | 'async', true> &
    Mandatory<'result', false> &
    ValidationOptions
): AsyncValidatable<V> & Ref<E>;

// validatable implementation
export function validatable<V>(
  _initialValue: V,
  _validate: (value: V) => SyncOrAsync<boolean | void, any>,
  options?: ValidatableOptions
) {
  const ValidatableClass = _getValidatableClass<V>(options);
  return new ValidatableClass(
    _assign(
      {
        _initialValue,
        _validate,
      },
      options,
      _isValidationOptionsKey
    )
  ) as Validatable<V, any>;
}

// synchronous parsable overloads
export function parsable<V, R>(
  initialValue: V,
  parseFn: (value: V) => R,
  options?: Optional<'ref' | 'async', false> & ValidationOptions
): Validatable<V> & Result<R>;

export function parsable<V, R, E = HTMLElement>(
  initialValue: V,
  parseFn: (value: V) => R,
  options: Mandatory<'ref', true> & Optional<'async', false> & ValidationOptions
): Validatable<V> & Ref<E> & Result<R>;

// asynchronous parsable overloads
export function parsable<V, R>(
  initialValue: V,
  parseFn: (value: V) => Promise<R>,
  options: Mandatory<'async', true> & Optional<'ref', false> & ValidationOptions
): AsyncValidatable<V> & AsyncResult<R>;

export function parsable<V, R, E = HTMLElement>(
  initialValue: V,
  parseFn: (value: V) => Promise<R>,
  options: Mandatory<'ref' | 'async', true> & ValidationOptions
): AsyncValidatable<V> & Ref<E> & AsyncResult<R>;

// parsable implementation
export function parsable<V, R>(
  _initialValue: V,
  _validate: (value: V) => SyncOrAsync<R, any>,
  options?: ParsableOptions
) {
  const ParsableClass = _getParsableClass<V, R>(options);
  return new ParsableClass(
    _assign(
      {
        _initialValue,
        _validate,
      },
      options,
      _isValidationOptionsKey
    )
  ) as Validatable<V, any> & Result<SyncOrAsync<R, any>>;
}

// validator overloads
export function validator(
  options?: ViewModelValidatorOptions
): ViewModelValidator;
export function validator(
  options: AsyncViewModelValidatorOptions
): AsyncViewModelValidator;

// validator implementation
export function validator(
  options?: ViewModelValidatorOptions | AsyncViewModelValidatorOptions
): ViewModelValidator<any> {
  return options?.async
    ? new _AsyncViewModelValidator(options as AsyncViewModelValidatorOptions)
    : new _ViewModelValidator(options as ViewModelValidatorOptions);
}

export const proxy: ProxyFunc = _proxy;

// resolveObject
export function resolveObject<T extends {}>(
  obj: T
): Promise<ResolvedObject<T>> {
  const ret: any = _assign({}, obj);
  const promises = Object.keys(ret).reduce<Promise<void>[]>((arr, name) => {
    const prop = ret[name];
    if (prop instanceof Promise) {
      arr.push(
        prop.then((value) => {
          ret[name] = value;
        })
      );
    }
    return arr;
  }, []);
  return Promise.all(promises).then(() => ret);
}
// end extensions scope
