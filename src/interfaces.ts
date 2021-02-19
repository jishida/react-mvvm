export type Optional<K extends string, B extends boolean = boolean> = {
  [key in K]?: B;
};

export type Mandatory<K extends string, B extends boolean = boolean> = {
  [key in K]: B;
};

export interface ObjectContainer<T> {
  add(item: T): void;
  remove(item: T): void;
}

export type ListenerContainer<T> = ObjectContainer<(arg: T) => void>;

export interface ViewModelObject {
  // Dependency  : 0x01
  // Value       : 0x02
  // Observable  : 0x04
  // Result      : 0x08 | 0x02
  // Validatable : 0x10 | 0x07
  // Parsable    : 0x20 | 0x1f
  // Async       : 0x40 | 0x10
  // Ref         : 0x80
  readonly spec: number;
}

export interface ReactRefObject<T> {
  current: T | null;
}

export type ReactRefCallback<T> = (instance: T | null) => void;

export type ForwardedRef<T> = ReactRefObject<T> | ReactRefCallback<T> | null;

export interface Ref<T> extends ViewModelObject {
  readonly ref: ReactRefObject<T>;
  bindRef(ref?: ForwardedRef<T>): ReactRefCallback<T>;
}

export interface Result<R> extends ViewModelObject {
  readonly result: R;
}

export interface DependencyValue<V> extends ViewModelObject {
  readonly value: V;
  readonly deps: ReadonlyArray<Observable<any>>;
}

export interface Representable<V> {
  to<T>(
    representFn: (value: V) => T,
    deps?: ReadonlyArray<any>
  ): DependencyValue<T>;
}

export type Computed<V> = DependencyValue<V> & Representable<V>;

export interface Observable<V> extends DependencyValue<V>, Representable<V> {
  value: V;
  bindValue<T extends any[]>(
    selector: (...args: T) => V,
    deps?: ReadonlyArray<any>
  ): (...args: T) => void;
  notify(): void;
  readonly onNotify: ListenerContainer<this>;
  compute<T>(
    computeFn: (value: V) => T,
    options?: Optional<'result', true> & Optional<'ref', false>
  ): Computed<T> & Result<T>;
  compute<T>(
    computeFn: (value: V) => T,
    options: Mandatory<'result', false> & Optional<'ref', false>
  ): Computed<T>;
  compute<E, T>(
    computeFn: (value: V) => T,
    options: Mandatory<'ref', true> & Optional<'result', true>
  ): Computed<T> & Result<T> & Ref<E>;
  compute<E, T>(
    computeFn: (value: V) => T,
    options: Mandatory<'ref', true> & Mandatory<'result', false>
  ): Computed<T> & Ref<E>;
}

export type ComputedArgsBase<
  D extends DependencyValue<any>[],
  A extends any[]
> = D extends [DependencyValue<infer V>, ...infer R]
  ? R extends DependencyValue<any>[]
    ? ComputedArgsBase<[...R], [...A, V]>
    : never
  : A;

export type DependencyTuple = [DependencyValue<any>, ...DependencyValue<any>[]];

export type ComputedArgs<D extends DependencyTuple> = ComputedArgsBase<D, []>;

export type ObservableOptions = Optional<'ref' | 'result'>;

export type ComputedOptions = Optional<'result' | 'ref'>;

export type ViewModel = { [prop: string]: ViewModelObject | any };
