import { Observable, Result } from '../../interfaces';
import { _AsyncValidatableOptions } from './interfaces';
import { _applyBias, _ViewModelObject, _ObservableOptions } from '../../core';
import _AsyncObjectValidator from './AsyncObjectValidator';
import _ValidatableBaseMixin from './ValidatableBaseMixin';

export default function AsyncParsableMixin<V, R>(
  BaseClass: new (options: _ObservableOptions<V>) => _ViewModelObject &
    Observable<V>
) {
  return class _AsyncParsable
    extends _ValidatableBaseMixin<V, R, true>(BaseClass)
    implements Result<Promise<R>> {
    _result?: R;

    constructor(options: _AsyncValidatableOptions<V, R>) {
      super(_applyBias(0x68, options));
    }

    _createObjectValidator(options: _AsyncValidatableOptions<V, R>) {
      const { _validate } = options;
      return new _AsyncObjectValidator(
        this,
        (value: V) =>
          _validate(value).then((result) => {
            this._result = result;
            return true;
          }),
        options
      );
    }

    get result(): Promise<R> {
      const { validator } = this;
      return validator.check().then(
        () => validator.currentTask?.then(() => this.result) || this._result!,
        (err) =>
          validator.currentTask?.then(() => this.result) || Promise.reject(err)
      );
    }
  };
}
