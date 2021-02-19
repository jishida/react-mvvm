import { DependencyValue, Observable } from '../../interfaces';
import { _ViewModelObjectOptions } from './interfaces';
import { _applyBias } from '../utils';
import _ViewModelObject from './ViewModelObject';

export default abstract class _DependencyValue<V>
  extends _ViewModelObject
  implements DependencyValue<V> {
  constructor(options?: _ViewModelObjectOptions) {
    super(_applyBias(0x01, options));
  }

  abstract get value(): V;

  abstract get deps(): ReadonlyArray<Observable<any>>;
}
