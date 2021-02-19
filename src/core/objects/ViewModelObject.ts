import { ViewModelObject } from '../../interfaces';
import { _applyBias } from '../utils';
import { _ViewModelObjectOptions } from './interfaces';

export default class _ViewModelObject implements ViewModelObject {
  readonly spec: number;

  constructor(options?: _ViewModelObjectOptions) {
    this.spec = _applyBias(0, options)._spec!;
  }
}
