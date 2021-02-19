import { AsyncObjectValidator } from '../../validators';
import _ObjectValidatorBase from './ObjectValidatorBase';
import { VALIDATION_FAILURE, _getErrorMessage } from './utils';

interface Task {
  _track?: Promise<[boolean, string]>;
  _latest?: Promise<[boolean, string]>;
  _current?: Promise<boolean>;
}

export default class _AsyncObjectValidator<V>
  extends _ObjectValidatorBase<V, true>
  implements AsyncObjectValidator {
  private _task?: Task;

  get currentTask() {
    return this._task?._current;
  }

  _createCurrentTask(): Promise<boolean> {
    const task = this._task!;
    return task._latest!.then(([hasError, errorMessage]) => {
      if (task._track === task._latest) {
        this._applyValidateResult(hasError, errorMessage);
        this._task = undefined;
        return Promise.resolve(!hasError);
      }
      task._track = task._latest;
      return this._createCurrentTask();
    });
  }

  validate() {
    this._lazy = false;
    if (this._validated) {
      return Promise.resolve(true);
    }
    const validate: Promise<[boolean, string]> = this._validate(
      this._source.value
    ).then(
      (value) => [value === false, ''],
      (err) => [true, _getErrorMessage(err)]
    );
    if (this._task) {
      this._task._latest = validate;
    } else {
      this._task = {
        _track: validate,
        _latest: validate,
      };
      this._task._current = this._createCurrentTask();
    }
    return this._task._current!;
  }

  check() {
    if (this._validated) {
      return Promise.resolve();
    }
    return this.validate().then(() => {
      if (!this._validated) {
        throw new Error(VALIDATION_FAILURE);
      }
    });
  }
}
