import {
  Computed,
  ComputedOptions,
  DependencyValue,
  ListenerContainer,
  Observable,
} from '../../interfaces';
import { _applyBias, _is, _argsToArray, _Container } from '../utils';
import { _getHooks } from '../modules';
import _Computed from './Computed';
import { _ObservableOptions, _Observer } from './interfaces';
import _DependencyValue from './DependencyValue';
import { _getComputedClass } from './computedClasses';

export default class _Observable<V>
  extends _DependencyValue<V>
  implements Observable<V> {
  readonly _observerSet = new Set<_Observer>();

  _onNotifyListenerSet?: Set<(sender: this) => void>;

  _onNotifyListenerContainer?: ListenerContainer<this>;

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

  get deps() {
    return [this];
  }

  notify() {
    const newObj = {};
    this._observerSet.forEach((observer) => {
      observer._update(newObj);
    });
    if (this._onNotifyListenerSet) {
      this._onNotifyListenerSet.forEach((listener) => {
        listener(this);
      });
    }
  }

  get onNotify() {
    if (!this._onNotifyListenerContainer) {
      this._onNotifyListenerSet = new Set();
      this._onNotifyListenerContainer = new _Container(
        this._onNotifyListenerSet
      );
    }
    return this._onNotifyListenerContainer!;
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
    }, deps || []);
  }

  compute<T>(computeFn: (value: V) => T, options?: ComputedOptions) {
    const ComputedClass = _getComputedClass<T, [DependencyValue<V>]>(options);
    const instance: Computed<T> = new ComputedClass(options, computeFn, [
      this as DependencyValue<V>,
    ]);
    return instance as any;
  }

  to<T>(representFn: (value: V) => T, deps?: ReadonlyArray<any>) {
    const instance: DependencyValue<T> = _getHooks().useMemo(
      () =>
        new _Computed(undefined, representFn, [this as DependencyValue<V>]),
      deps || []
    );
    return instance;
  }
}
