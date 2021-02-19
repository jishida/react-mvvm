import {
  InheritValidationOptions,
  ValidationBase,
  ValidationOptions,
  ValidationStrategy,
  WatchValidationOptions,
} from '../../validators';

export default abstract class _ValidationBase implements ValidationBase {
  private _strategy: ValidationStrategy = 'inherit';

  private _watch: boolean = false;

  private _delay?: number;

  protected _lazy: boolean = false;

  private _parent?: ValidationBase;

  enabled: boolean = true;

  get strategy() {
    return this._strategy;
  }

  get watch() {
    return this._parent ? this._parent.watch : this._watch;
  }

  get delay() {
    return this._parent ? this._parent.delay : this._delay;
  }

  get lazy() {
    return this._parent ? this._parent.lazy : this._lazy;
  }

  get parent() {
    return this._parent;
  }

  configure(options: ValidationOptions) {
    this._strategy = options.strategy || 'inherit';
    this._parent = undefined;
    const { enabled } = options;
    if (enabled !== undefined) {
      this.enabled = !!enabled;
    }
    switch (this._strategy) {
      case 'inherit':
        this._parent = (options as InheritValidationOptions).parent;
      // falls through
      case 'none':
        this._watch = false;
        this._delay = undefined;
        this._lazy = false;
        break;
      case 'watch':
        this._watch = true;
        this._delay = (options as WatchValidationOptions).delay;
        this._lazy = !!(options as WatchValidationOptions).lazy;
      // no default
    }
  }

  abstract reset(): void;
}
