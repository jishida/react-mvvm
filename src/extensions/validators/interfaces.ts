import { SyncOrAsync, ValidationOptions } from '../../validators';
import { _ObservableOptions } from '../../core';

export interface _ValidatableOptionsBase<V, R, Async extends boolean = false> {
  _validate: (value: V) => SyncOrAsync<R, Async>;
}

export type _ValidatableOptions<
  V,
  R,
  Async extends boolean = false
> = _ObservableOptions<V> &
  ValidationOptions &
  _ValidatableOptionsBase<V, R, Async>;
export type _AsyncValidatableOptions<V, R> = _ValidatableOptions<V, R, true>;
