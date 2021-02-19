import { AsyncResult, AsyncValidatable } from '../../validators';
import { _AsyncValidatableOptions } from './interfaces';
import { _applyBias, _ViewModelObject } from '../../core';

export default function AsyncValidatableResultMixin<R>(
  BaseClass: new (
    options: _AsyncValidatableOptions<R, boolean | void>
  ) => _ViewModelObject & AsyncValidatable<R>
) {
  return class _AsyncValidatableResult
    extends BaseClass
    implements AsyncResult<R> {
    constructor(options: _AsyncValidatableOptions<R, boolean | void>) {
      super(_applyBias(0x08, options));
    }

    get result(): Promise<R> {
      const { validator } = this;
      return this.validator.check().then(
        () => validator.currentTask?.then(() => this.result) || this.value,
        (err) =>
          validator.currentTask?.then(() => this.result) || Promise.reject(err)
      );
    }
  };
}
