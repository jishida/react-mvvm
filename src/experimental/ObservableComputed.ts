import React from 'react';
import { Computed, ComputedArgs, Observable } from '../interfaces';
import { _applyBias } from '../core/utils';
import {
  _DependencyValue,
  _Observable,
  _ViewModelObjectOptions,
} from '../core';
import { Disposable, ObservableTuple } from './interfaces';

export default class _ObservableComputed<V, T extends ObservableTuple>
  extends _DependencyValue<V>
  implements Computed<V>, Disposable {
  readonly _observable: Observable<V>;

  readonly _deps: T;

  readonly _compute: () => V;

  _timeoutId: number = 0;

  _disposed: boolean = false;

  readonly _notifyListener = () => {
    if (!this._timeoutId) {
      this._timeoutId = window.setTimeout(() => {
        this._timeoutId = 0;
        this._observable.value = this._compute();
      });
    }
  };

  constructor(
    options: _ViewModelObjectOptions,
    computeFn: (...args: ComputedArgs<T>) => V,
    deps: T
  ) {
    super(_applyBias(0x20, options));
    this._deps = deps.slice() as T;
    this._compute = () =>
      computeFn(...(this._deps.map((dep) => dep.value) as ComputedArgs<T>));
    const _initialValue = this._compute();
    this._observable = new _Observable({ _initialValue });
    this._deps.forEach((dep) => {
      dep.onNotify.add(this._notifyListener);
    });
  }

  get deps() {
    return [this._observable];
  }

  get value() {
    return this._observable.value;
  }

  to<R>(representFn: (value: V) => R, deps?: ReadonlyArray<any>) {
    const instance = React.useMemo(
      () => new _ObservableComputed({}, representFn, [this._observable]),
      deps || []
    );
    React.useEffect(
      () => () => {
        instance.dispose();
      },
      []
    );
    return instance;
  }

  dispose() {
    if (!this._disposed) {
      this.deps.forEach((dep) => {
        dep.onNotify.remove(this._notifyListener);
      });
      this._disposed = true;
    }
  }
}
