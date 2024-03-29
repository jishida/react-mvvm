import React from 'react';
import {
  ValueTuple,
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
import { BindComponent, DOMBindComponent } from './views';
import {
// omitted extensions line
  _getObservableClass,
  _useBind,
  _createBindComponent,
  _Ref,
  _argsToArray,
  _getComputedClass,
  _emptyArray,
  _isViewModelObject,
} from './core';
// omitted extensions scope

export * from './interfaces';
export * from './views';

export const Bind: BindComponent = _createBindComponent('Bind');

export const DOMBind: DOMBindComponent = _createBindComponent('DOMBind');

export const isViewModelObject: (
  value: any
) => value is ViewModelObject = _isViewModelObject;

// useBind overload
export function useBind<D extends DependencyTuple>(...deps: D): ValueTuple<D>;

// useBind implementation
export function useBind() {
  // eslint-disable-next-line prefer-rest-params
  const args = arguments;
  const [values, observables] = React.useMemo(() => {
    const depValues: DependencyValue<any>[] = _argsToArray(args);
    const bindObservables = depValues.reduce<Observable<any>[]>(
      (arr, depValue) => {
        depValue.deps.forEach((dep) => {
          if (!arr.some((o) => o === dep)) {
            arr.push(dep);
          }
        });
        return arr;
      },
      []
    );
    return [depValues, bindObservables];
  }, _emptyArray);
  _useBind(observables);
  return values.map((v) => v.value);
}

export function ref<E = HTMLElement>() {
  return new _Ref() as Ref<E>;
}
// computed overloads
export function computed<V, D extends DependencyTuple>(
  computeFn: (...args: ValueTuple<D>) => V,
  deps: D,
  options?: Optional<'result', true> & Optional<'ref', false>
): Computed<V> & Result<V>;
export function computed<V, D extends DependencyTuple>(
  computeFn: (...args: ValueTuple<D>) => V,
  deps: D,
  options: Mandatory<'result', false> & Optional<'ref', false>
): Computed<V>;

export function computed<V, D extends DependencyTuple, E = HTMLElement>(
  computeFn: (...args: ValueTuple<D>) => V,
  deps: D,
  options: Mandatory<'ref', true> & Optional<'result', true>
): Computed<V> & Result<V> & Ref<E>;
export function computed<V, D extends DependencyTuple, E = HTMLElement>(
  computeFn: (...args: ValueTuple<D>) => V,
  deps: D,
  options: Mandatory<'result', false> & Mandatory<'ref', true>
): Computed<V> & Ref<E>;

// computed implementation
export function computed<V, D extends DependencyTuple>(
  computeFn: (...args: ValueTuple<D>) => V,
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
