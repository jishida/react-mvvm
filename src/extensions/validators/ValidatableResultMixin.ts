import { Result } from '../../interfaces';
import { Validatable } from '../../validators';
import { _ValidatableOptions } from './interfaces';
import { _applyBias, _ViewModelObject } from '../../core';

export default function ValidatableResultMixin<R>(
  BaseClass: new (
    options: _ValidatableOptions<R, boolean | void>
  ) => _ViewModelObject & Validatable<R>
) {
  return class _ValidatableResult extends BaseClass implements Result<R> {
    constructor(options: _ValidatableOptions<R, boolean | void>) {
      super(_applyBias(0x08, options));
    }

    get result() {
      this.validator.check();
      return this.value;
    }
  };
}
