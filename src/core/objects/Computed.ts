import React from 'react';
import {
  ValueTuple,
  Computed,
  DependencyValue,
  DependencyTuple,
  Observable,
} from '../../interfaces';
import { _applyBias, _emptyArray } from '../utils';
import _DependencyValue from './DependencyValue';
import { _ComputedOptions } from './interfaces';

export default class _Computed<V, D extends DependencyTuple>
  extends _DependencyValue<V>
  implements Computed<V> {
  readonly _valueSources: ReadonlyArray<DependencyValue<any>>;

  readonly _compute: (...args: ValueTuple<D>) => V;

  readonly deps: ReadonlyArray<Observable<any>>;

  constructor(
    options: _ComputedOptions | undefined,
    computeFn: (...args: ValueTuple<D>) => V,
    deps: D
  ) {
    super(_applyBias(0x02, options));
    this._valueSources = deps.slice();
    const observables: Observable<any>[] = [];
    deps.forEach((dep) => {
      dep.deps.forEach((d) => {
        if (!observables.some((o) => o === d)) {
          observables.push(d);
        }
      });
    });
    this.deps = observables;
    this._compute = computeFn;
  }

  get value() {
    const values = this._valueSources.map((o) => o.value) as ValueTuple<D>;
    return this._compute(...values);
  }

  to<T>(representFn: (value: V) => T, deps?: ReadonlyArray<any>) {
    return React.useMemo(
      () => new _Computed({}, representFn, [this as DependencyValue<V>]),
      deps || _emptyArray
    );
  }
}
