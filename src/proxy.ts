import {
  DependencyValue,
  Observable,
  Optional,
  Ref,
  Result,
  ViewModel,
  ViewModelObject,
} from './interfaces';

export type BuiltinProxyFilter =
  | 'ref'
  | 'value'
  | 'state'
  | 'result'
  | 'error'
  | 'message';

export type ProxyFilter = Optional<
  'value' | 'observable' | 'ref' | 'result' | 'validatable' | 'async'
>;

export type ViewModelProxy<
  VM extends ViewModel,
  T,
  I extends ViewModelObject,
  E extends ViewModelObject | void = void
> = {
  readonly [K in keyof VM as VM[K] extends I
    ? VM[K] extends E
      ? never
      : K
    : never]: VM[K] extends I ? (VM[K] extends E ? never : T) : never;
};

export type ViewModelMutableProxy<
  VM extends ViewModel,
  T,
  I extends ViewModelObject,
  E extends ViewModelObject | void = void
> = {
  -readonly [K in keyof VM as VM[K] extends I
    ? VM[K] extends E
      ? never
      : K
    : never]: VM[K] extends I ? (VM[K] extends E ? never : T) : never;
};

export type RefProxy<VM extends ViewModel> = {
  -readonly [K in keyof VM as VM[K] extends Ref<any>
    ? K
    : never]: VM[K] extends Ref<infer E> ? E : never;
};

export type ValueProxy<VM extends ViewModel> = {
  -readonly [K in keyof VM as VM[K] extends DependencyValue<any>
    ? K
    : never]: VM[K] extends DependencyValue<infer V> ? V : never;
};

export type StateProxy<VM extends ViewModel> = {
  -readonly [K in keyof VM as VM[K] extends Observable<any>
    ? K
    : never]: VM[K] extends Observable<infer V> ? V : never;
};

export type ResultProxy<VM extends ViewModel> = {
  readonly [K in keyof VM as VM[K] extends Result<any>
    ? K
    : never]: VM[K] extends Result<infer R> ? R | undefined : never;
};

export type ResolvedObject<T extends {}> = {
  readonly [K in keyof T]: T[K] extends Promise<infer V> ? V : T[K];
};
