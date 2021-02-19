import { Observable } from '../../interfaces';
import { _ValidatableOptions } from './interfaces';
import { _ViewModelObject, _ObservableOptions } from '../../core';
import _ObjectValidator from './ObjectValidator';
import _ValidatableBaseMixin from './ValidatableBaseMixin';

export default function ValidatableMixin<V>(
  BaseClass: new (options: _ObservableOptions<V>) => _ViewModelObject &
    Observable<V>
) {
  return class _Validatable extends _ValidatableBaseMixin<
    V,
    boolean | void,
    false
  >(BaseClass) {
    _createObjectValidator(options: _ValidatableOptions<V, boolean | void>) {
      return new _ObjectValidator<V>(this, options._validate, options);
    }
  };
}
