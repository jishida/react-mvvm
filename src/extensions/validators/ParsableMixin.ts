import { Observable, Result } from '../../interfaces';
import { _ValidatableOptions } from './interfaces';
import { _applyBias, _ViewModelObject, _ObservableOptions } from '../../core';
import _ObjectValidator from './ObjectValidator';
import _ValidatableBaseMixin from './ValidatableBaseMixin';

export default function ParsableMixin<V, R>(
  BaseClass: new (options: _ObservableOptions<V>) => _ViewModelObject &
    Observable<V>
) {
  return class _Parsable
    extends _ValidatableBaseMixin<V, R, false>(BaseClass)
    implements Result<R> {
    _result?: R;

    constructor(options: _ValidatableOptions<V, R>) {
      super(_applyBias(0x28, options));
    }

    _createObjectValidator(options: _ValidatableOptions<V, R>) {
      const { _validate } = options;
      return new _ObjectValidator(
        this,
        (value: V) => {
          this._result = _validate(value);
        },
        options
      );
    }

    get result() {
      this.validator.check();
      return this._result!;
    }
  };
}
