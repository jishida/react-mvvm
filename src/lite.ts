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
// omitted extensions line
  _getObservableClass,
  _setHooks,
  _useBind,
  _createBindComponent,
  _ViewModelObject,
  _Ref,
  _argsToArray,
  _getComputedClass,
  _Observable,
} from './core';
// omitted extensions scope

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
    values.reduce<_Observable<any>[]>((observables, value) => {
      value.deps.forEach((dep) => {
        if (dep instanceof _Observable && !observables.some((o) => o === dep)) {
          observables.push(dep);
        }
      });
      return observables;
    }, [])
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

// omitted extensions scope
