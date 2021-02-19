import { ObservableOptions, parsable, validatable } from '@jishida/react-mvvm';
import { appendObservableOptionsCases } from './options';
import {
  validatableOptionKeys,
  parsableOptionKeys,
  getValidatableOptions,
  getParsableOptions,
} from './extensionsOptions';

appendObservableOptionsCases(
  validatableOptionKeys.map((keys) => [
    keys === 'none' ? 'validatable' : `validatable:${keys}`,
    getValidatableOptions(keys),
    (initialValue: any, options: ObservableOptions) =>
      validatable(initialValue, () => undefined, options as any),
  ])
);

appendObservableOptionsCases(
  parsableOptionKeys.map((keys) => [
    keys === 'none' ? 'parsable' : `parsable:${keys}`,
    getParsableOptions(keys),
    (initialValue: any, options: ObservableOptions) =>
      parsable(initialValue, () => undefined, options as any),
  ])
);
