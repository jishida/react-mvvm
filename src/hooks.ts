export interface Hooks {
  useState<S>(initialState: S): [S, (value: (state: S) => S) => void];
  useMemo<T>(factory: () => T, deps: ReadonlyArray<any> | undefined): T;
  useCallback<T extends (...args: any[]) => any>(
    callback: T,
    deps: ReadonlyArray<any>
  ): T;
  useEffect(effect: () => () => void, deps?: ReadonlyArray<any>): void;
}
