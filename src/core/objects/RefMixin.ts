import {
  ForwardedRef,
  ReactRefCallback,
  ReactRefObject,
  Ref,
} from '../../interfaces';
import { _applyBias, _argsToArray } from '../utils';
import { _ViewModelObjectOptions } from './interfaces';
import _ViewModelObject from './ViewModelObject';

export default function _RefMixin<
  T,
  O extends _ViewModelObjectOptions,
  A extends any[]
>(BaseClass: new (options: O, ...args: A) => _ViewModelObject) {
  return class _Ref extends BaseClass implements Ref<T> {
    _ref: ReactRefObject<T> = { current: null };

    _refObject?: ReactRefObject<T>;

    _refCallback?: ReactRefCallback<T>;

    constructor(options?: O) {
      // eslint-disable-next-line prefer-rest-params
      super(_applyBias(0x80, options), ...(_argsToArray(arguments, 1) as A));
    }

    readonly _setRef = (instance: T | null) => {
      this._ref.current = instance;
      if (this._refObject) {
        this._refObject.current = instance;
      } else if (this._refCallback) {
        this._refCallback(instance);
      }
    };

    get ref() {
      return this._ref;
    }

    bindRef(ref?: ForwardedRef<T>) {
      this._refObject = undefined;
      this._refCallback = undefined;
      if (ref && typeof ref === 'object') {
        this._refObject = ref as ReactRefObject<T>;
        ref.current = this._ref.current;
      } else if (typeof ref === 'function') {
        const f = ref as ReactRefCallback<T>;
        this._refCallback = f;
        f(this._ref.current);
      }
      return this._setRef;
    }
  };
}
