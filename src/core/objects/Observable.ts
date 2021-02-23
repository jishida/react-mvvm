import {
  ComputedOptions,
  DependencyValue,
  ListenerContainer,
  Observable,
} from '../../interfaces';
import {
  _applyBias,
  _is,
  _argsToArray,
  _Container,
  _emptyArray,
} from '../utils';
import { _getHooks } from '../modules';
import _Computed from './Computed';
import { _ObservableOptions } from './interfaces';
import _DependencyValue from './DependencyValue';
import { _getComputedClass } from './computedClasses';

export default class _Observable<V>
  extends _DependencyValue<V>
  implements Observable<V> {
  _onNotifyListenerSet = new Set<(sender: this) => void>();

  _onNotifyListenerContainer: ListenerContainer<this> = new _Container(
    this._onNotifyListenerSet
  );

  _value: V;

  constructor(options: _ObservableOptions<V>) {
    super(_applyBias(0x06, options));
    this._value = options._initialValue;
  }

  get value() {
    return this._value as V;
  }

  set value(value: V) {
    if (!_is(this._value, value)) {
      this._value = value;
      this.notify();
    }
  }

  get deps(): ReadonlyArray<Observable<any>> {
    return [this];
  }

  notify() {
    this._onNotifyListenerSet.forEach((listener) => {
      listener(this);
    });
  }

  get onNotify() {
    return this._onNotifyListenerContainer;
  }

  bindValue<T extends any[]>(
    selector: (...args: T) => V,
    deps?: ReadonlyArray<any>
  ) {
    const self = this;
    // eslint-disable-next-line func-names
    return _getHooks().useCallback(function () {
      // eslint-disable-next-line prefer-rest-params
      const args = _argsToArray(arguments) as T;
      // eslint-disable-next-line prefer-spread
      self.value = selector.apply(null, args);
    }, deps || _emptyArray);
  }

  compute<T>(computeFn: (value: V) => T, options?: ComputedOptions) {
    const ComputedClass = _getComputedClass<T, [DependencyValue<V>]>(options);
    return new ComputedClass(options, computeFn, [this]) as any;
  }

  to<T>(
    representFn: (value: V) => T,
    deps?: ReadonlyArray<any>
  ): DependencyValue<T> {
    return _getHooks().useMemo<DependencyValue<T>>(
      () => new _Computed(undefined, representFn, [this as DependencyValue<V>]),
      deps || _emptyArray
    );
  }
}
