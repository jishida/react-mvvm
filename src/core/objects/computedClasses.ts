import { _ComputedOptions, _ObservableOptions } from './interfaces';
import {
  Computed,
  ComputedOptions,
  DependencyTuple,
  ValueTuple,
} from '../../interfaces';
import _ViewModelObject from './ViewModelObject';
import _Computed from './Computed';
import _ResultMixin from './ResultMixin';
import _RefMixin from './RefMixin';
import { _getClassIndex } from '../utils';

type ComputedClass<V, D extends DependencyTuple> = new (
  options: _ComputedOptions | undefined,
  computeFn: (...args: ValueTuple<D>) => V,
  deps: D
) => _ViewModelObject & Computed<V>;
type ComputedClassArgs<V, D extends DependencyTuple> = [
  (...args: ValueTuple<D>) => V,
  D
];

const computedClasses = new Array<ComputedClass<any, any>>(4);

export function _getComputedClass<V, D extends DependencyTuple>(
  options?: ComputedOptions
) {
  const opts = options || {};
  const key = _getClassIndex(opts);
  let cls: ComputedClass<V, D> = computedClasses[key];
  if (!cls) {
    cls = _Computed;
    if (opts.result !== false) {
      cls = _ResultMixin<V, _ComputedOptions, ComputedClassArgs<V, D>>(
        cls
      ) as any;
    }
    if (opts.ref) {
      cls = _RefMixin<unknown, _ObservableOptions<V>, ComputedClassArgs<V, D>>(
        cls
      ) as any;
    }
    computedClasses[key] = cls;
  }
  return cls;
}
