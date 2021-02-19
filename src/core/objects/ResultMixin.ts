import { Result, DependencyValue } from '../../interfaces';
import { _applyBias, _argsToArray } from '../utils';
import { _ViewModelObjectOptions } from './interfaces';

export default function _ResultMixin<
  R,
  O extends _ViewModelObjectOptions,
  A extends any[]
>(BaseClass: new (options: O, ...args: A) => DependencyValue<R>) {
  return class _Result extends BaseClass implements Result<R> {
    constructor(options: O) {
      // eslint-disable-next-line prefer-rest-params
      super(_applyBias(0x08, options), ...(_argsToArray(arguments, 1) as A));
    }

    get result() {
      return this.value;
    }
  };
}
