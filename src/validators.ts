import {
  Mandatory,
  Observable,
  ObservableOptions,
  Optional,
  Result,
} from './interfaces';

export type SyncOrAsync<T, Async extends boolean = false> = Async extends true
  ? Promise<T>
  : T;

export type AsyncResult<R> = Result<Promise<R>>;

export type ValidationStrategy = 'none' | 'inherit' | 'watch';

export interface NoneValidationOptions {
  strategy: 'none';
}

export interface InheritValidationOptions {
  strategy?: 'inherit';
  parent?: ValidationBase;
}

export interface WatchValidationOptions {
  strategy: 'watch';
  delay?: number;
  lazy?: boolean;
}

export interface ValidationOptionsBase {
  enabled?: boolean;
}

export type ValidationOptions = ValidationOptionsBase &
  (NoneValidationOptions | InheritValidationOptions | WatchValidationOptions);

export interface ValidationBase {
  readonly strategy: ValidationStrategy;
  readonly watch: boolean;
  readonly delay: number | undefined;
  readonly lazy: boolean;
  readonly parent: ValidationBase | undefined;
  enabled: boolean;
  configure(options: ValidationOptions): void;
  reset(): void;
}

export interface ValidatorBase<Async extends boolean = false>
  extends ValidationBase {
  validate(): SyncOrAsync<boolean, Async>;
}

export interface ObjectValidatorBase<Async extends boolean>
  extends ValidatorBase<Async> {
  check(): SyncOrAsync<void, Async>;
}
export interface AsyncObjectValidator extends ObjectValidatorBase<true> {
  readonly currentTask?: Promise<boolean>;
}
export type ObjectValidator<Async extends boolean = false> = Async extends true
  ? AsyncObjectValidator
  : ObjectValidatorBase<Async>;

export type ViewModelValidatorItem<Async extends boolean = false> =
  | {
      [s: string]: Validatable<any, Async extends true ? boolean : false> | any;
    }
  | (
      | Validatable<any, Async extends true ? boolean : false>
      | ValidatorBase<Async extends true ? boolean : false>
      | any
    )[]
  | Validatable<any, Async extends true ? boolean : false>
  | ValidatorBase<Async extends true ? boolean : false>;
export type AsyncViewModelValidatorItem = ViewModelValidatorItem<true>;

export interface ViewModelValidator<Async extends boolean = false>
  extends ValidatorBase<Async> {
  register(...items: ViewModelValidatorItem<Async>[]): this;
  unregister(...items: ViewModelValidatorItem<Async>[]): this;
}
export type AsyncViewModelValidator = ViewModelValidator<true>;

export interface Validatable<V, Async extends boolean = false>
  extends Observable<V> {
  readonly validator: ObjectValidator<Async>;
  validate(): SyncOrAsync<boolean, Async>;
  readonly hasError: Observable<boolean>;
  readonly errorMessage: Observable<string>;
}
export type AsyncValidatable<V> = Validatable<V, true>;

export type ValidatableOptions = ObservableOptions &
  Optional<'async'> &
  ValidationOptions;

export type ParsableOptions = Omit<ValidatableOptions, 'result'>;

export type ViewModelValidatorOptions = ValidationOptions &
  Optional<'async', false>;
export type AsyncViewModelValidatorOptions = ValidationOptions &
  Mandatory<'async', true> &
  Optional<'parallel'>;
