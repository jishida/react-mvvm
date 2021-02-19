import { ViewModelValidatorOptions } from '../../validators';
import _ObjectValidator from './ObjectValidator';
import _ViewModelValidatorBase from './ViewModelValidatorBase';

export default class _ViewModelValidator extends _ViewModelValidatorBase<false> {
  constructor(options: ViewModelValidatorOptions) {
    super(options);
    this._validatorClasses.push(_ObjectValidator, _ViewModelValidator);
  }

  validate() {
    let ok = true;
    this._lazy = false;
    this._validators.forEach((validator) => {
      if (validator.enabled && !validator.validate()) {
        ok = false;
      }
    });
    return ok;
  }
}
