import { Observable } from '../../interfaces';
import { ObjectValidator, SyncOrAsync, Validatable } from '../../validators';
import { _ValidatableOptions } from './interfaces';
import {
  _applyBias,
  _Observable,
  _ViewModelObject,
  _ObservableOptions,
} from '../../core';

export default function _ValidatableBaseMixin<V, R, Async extends boolean>(
  BaseClass: new (options: _ObservableOptions<V>) => _ViewModelObject &
    Observable<V>
) {
  return class _ValidatableBase
    extends BaseClass
    implements Validatable<V, Async> {
    readonly hasError = new _Observable<boolean>({
      _initialValue: false,
    });

    readonly errorMessage = new _Observable<string>({
      _initialValue: '',
    });

    readonly validator: ObjectValidator<Async>;

    constructor(options: _ValidatableOptions<V, R, Async>) {
      super(_applyBias(0x10, options));
      this.validator = this._createObjectValidator(options);
    }

    validate() {
      return this.validator.validate() as SyncOrAsync<boolean, Async>;
    }

    // @ts-ignore
    _createObjectValidator(
      options: _ValidatableOptions<V, R, Async>
    ): ObjectValidator<Async>;
  };
}
