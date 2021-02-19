import { Observable, Result, Validatable } from '../../src';
import { _ObservableOptions, _getObservableClass, _Ref } from '../../src/core';
import {
  _getParsableClass,
  _getValidatableClass,
  _ValidatableOptions,
} from '../../src/extensions/validators';
import { observableOptionKeys, ObservableOptionKeys } from './coreOptions';
import {
  validatableOptionKeys,
  parsableOptionKeys,
  ValidatableOptionKeys,
  ParsableOptionKeys,
} from './extensionsOptions';

export type RefObjectKey = 'ref';
export type ObservableObjectKeys =
  | 'observable'
  | `observable:${Exclude<ObservableOptionKeys, 'none'>}`;

export type ValidatableObjectKeys =
  | 'validatable'
  | `validatable:${Exclude<ValidatableOptionKeys, 'none'>}`;

export type ParsableObjectKeys =
  | 'parsable'
  | `parsable:${Exclude<ParsableOptionKeys, 'none'>}`;

export type ObjectKeys =
  | RefObjectKey
  | ObservableObjectKeys
  | ValidatableObjectKeys
  | ParsableObjectKeys;

export function getClass(keys: RefObjectKey): typeof _Ref;
export function getClass(
  keys: ObservableObjectKeys
): new <V>(options: _ObservableOptions<V>) => Observable<V>;
export function getClass(
  keys: ValidatableObjectKeys
): new <V>(options: _ValidatableOptions<V, boolean | void>) => Validatable<V>;
export function getClass(
  keys: ParsableObjectKeys
): new <V, R>(options: _ValidatableOptions<V, R>) => Validatable<V> & Result<R>;

export function getClass(keys: ObjectKeys) {
  if (keys === 'ref') {
    return _Ref;
  }
  let func: Function | null = null;
  const opts: any = { result: false };
  keys.split(':').forEach((key) => {
    switch (key) {
      case 'observable':
        func = _getObservableClass;
        break;
      case 'validatable':
        func = _getValidatableClass;
        break;
      case 'parsable':
        func = _getParsableClass;
        break;
      default:
        opts[key] = true;
    }
  });
  return func!(opts);
}

export const observableClassKeys: ObservableObjectKeys[] = observableOptionKeys.map(
  (keys) =>
    keys === 'none'
      ? 'observable'
      : (`observable:${keys}` as ObservableObjectKeys)
);

export const validatableClassKeys: ValidatableObjectKeys[] = validatableOptionKeys.map(
  (key) =>
    key === 'none'
      ? 'validatable'
      : (`validatable:${key}` as ValidatableObjectKeys)
);

export const parsableClassKeys: ParsableObjectKeys[] = parsableOptionKeys.map(
  (keys) =>
    keys === 'none' ? 'parsable' : (`parsable:${keys}` as ParsableObjectKeys)
);
