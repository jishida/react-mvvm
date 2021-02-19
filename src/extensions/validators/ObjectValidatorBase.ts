import {
  ObjectValidatorBase,
  SyncOrAsync,
  Validatable,
  ValidationOptions,
} from '../../validators';
import _ValidationBase from './ValidationBase';

export default abstract class _ObjectValidatorBase<V, Async extends boolean>
  extends _ValidationBase
  implements ObjectValidatorBase<Async> {
  protected _validated: boolean = false;

  private _timeoutId: number = 0;

  constructor(
    protected readonly _source: Validatable<V, Async>,
    protected readonly _validate: (
      value: V
    ) => SyncOrAsync<boolean | void, Async>,
    options: ValidationOptions
  ) {
    super();
    this.configure(options);
    _source.onNotify.add(() => {
      this._validated = false;
      if (this.watch && !this.lazy) {
        if (typeof this.delay === 'number') {
          if (this._timeoutId) {
            clearTimeout(this._timeoutId);
          }
          this._timeoutId = window.setTimeout(
            this.validate.bind(this),
            this.delay
          );
        } else {
          this.validate();
        }
      }
    });
  }

  _applyValidateResult(hasError: boolean, errorMessage: string) {
    this._source.hasError.value = hasError;
    this._source.errorMessage.value = errorMessage;
    this._validated = !hasError;
  }

  abstract validate(): SyncOrAsync<boolean, Async>;

  abstract check(): SyncOrAsync<void, Async>;

  reset() {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
      this._timeoutId = 0;
    }
    this._validated = false;
    this._source.hasError.value = false;
    this._source.errorMessage.value = '';
  }
}
