import {
  Observable,
  ObservableOptions,
  observable,
  ComputedOptions,
} from '@jishida/react-mvvm';
import { observableOptionKeys, getObservableOptions } from './coreOptions';

export type ObservableObjectFactory<V> = (
  initialValue: V,
  options: ObservableOptions
) => Observable<V>;
export type ObservableOptionsCase<V> = [
  string,
  ObservableOptions,
  ObservableObjectFactory<V>
];

const observableOptionsCases: ObservableOptionsCase<any>[] = observableOptionKeys.map(
  (keys) =>
    [
      keys === 'none' ? 'observable' : `observable:${keys}`,
      getObservableOptions(keys),
      observable,
    ] as ObservableOptionsCase<any>
);

export function appendObservableOptionsCases(
  cases: ObservableOptionsCase<any>[]
) {
  observableOptionsCases.push(...cases);
}

export function getObservableOptionsCases() {
  return observableOptionsCases;
}

export type ComputedOptionsCase = [string, ComputedOptions];
export const computedOptionsCases: ComputedOptionsCase[] = observableOptionKeys.map(
  (keys) =>
    [
      keys === 'none' ? 'computed' : `computed:${keys}`,
      getObservableOptions(keys),
    ] as ComputedOptionsCase
);
