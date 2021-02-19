import _ObjectValidatorBase from './ObjectValidatorBase';
import { VALIDATION_FAILURE, _getErrorMessage } from './utils';

export default class _ObjectValidator<V> extends _ObjectValidatorBase<
  V,
  false
> {
  validate() {
    this._lazy = false;
    let hasError: boolean = false;
    if (!this._validated) {
      let errorMessage: string = '';
      try {
        hasError = this._validate(this._source.value) === false;
      } catch (err) {
        hasError = true;
        errorMessage = _getErrorMessage(err);
      }
      this._applyValidateResult(hasError, errorMessage);
    }
    return !hasError;
  }

  check() {
    if (!this._validated) {
      this.validate();
      if (!this._validated) {
        throw new Error(VALIDATION_FAILURE);
      }
    }
  }
}
