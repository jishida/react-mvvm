import { Observable } from '../../interfaces';
import { _AsyncValidatableOptions } from './interfaces';
import { _applyBias, _ViewModelObject, _ObservableOptions } from '../../core';
import _AsyncObjectValidator from './AsyncObjectValidator';
import _ValidatableBaseMixin from './ValidatableBaseMixin';

export default function AsyncValidatableMixin<V>(
  BaseClass: new (options: _ObservableOptions<V>) => _ViewModelObject &
    Observable<V>
) {
  return class _AsyncValidatable extends _ValidatableBaseMixin<
    V,
    boolean | void,
    true
  >(BaseClass) {
    constructor(options: _AsyncValidatableOptions<V, boolean | void>) {
      super(_applyBias(0x40, options));
    }

    _createObjectValidator(
      options: _AsyncValidatableOptions<V, boolean | void>
    ) {
      return new _AsyncObjectValidator<V>(this, options._validate, options);
    }
  };
}
