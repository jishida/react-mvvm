import {
  validator,
  ParsableOptions,
  ValidatableOptions,
  ValidationOptions,
} from '@jishida/react-mvvm';
import { OptionKey } from './coreOptions';

export type ValidatableOptionKeys =
  | 'none'
  | OptionKey<['ref']>
  | OptionKey<['result']>
  | OptionKey<['ref', 'result']>
  | OptionKey<['async']>
  | OptionKey<['ref', 'async']>
  | OptionKey<['result', 'async']>
  | OptionKey<['ref', 'result', 'async']>;

export type ParsableOptionKeys =
  | 'none'
  | OptionKey<['ref']>
  | OptionKey<['async']>
  | OptionKey<['ref', 'async']>;

export function getValidatableOptions(keys: ValidatableOptionKeys) {
  const options: ValidatableOptions = {
    ref: false,
    result: false,
    async: false,
  };
  keys.split(':').forEach((key) => {
    switch (key) {
      case 'ref':
      case 'result':
      case 'async':
        (options as any)[key] = true;
      // no default
    }
  });
  return options;
}

export function getParsableOptions(keys: ValidatableOptionKeys) {
  const options: ParsableOptions = {
    ref: false,
    async: false,
  };
  keys.split(':').forEach((key) => {
    switch (key) {
      case 'ref':
      case 'async':
        (options as any)[key] = true;
      // no default
    }
  });
  return options;
}

export const validatableOptionKeys: ValidatableOptionKeys[] = [
  'none',
  'ref',
  'result',
  'ref:result',
  'async',
  'ref:async',
  'result:async',
  'ref:result:async',
];

export const parsableOptionKeys: ParsableOptionKeys[] = [
  'none',
  'ref',
  'async',
  'ref:async',
];

export const validationOptionsCases: [string, ValidationOptions, any][] = [
  [
    { strategy: 'none' },
    { strategy: 'none', watch: false, delay: undefined, lazy: false },
  ],
  [
    { strategy: 'inherit' },
    { strategy: 'inherit', watch: false, delay: undefined, lazy: false },
  ],
  [
    {
      strategy: 'inherit',
      parent: { strategy: 'watch', delay: 1000, lazy: true } as any,
    },
    { strategy: 'inherit', watch: true, delay: 1000, lazy: true },
  ],
  [
    { strategy: 'watch' },
    { strategy: 'watch', watch: true, delay: undefined, lazy: false },
  ],
  [
    { strategy: 'watch', delay: 500 },
    { strategy: 'watch', watch: true, delay: 500, lazy: false },
  ],
  [
    { strategy: 'watch', lazy: true },
    { strategy: 'watch', watch: true, delay: undefined, lazy: true },
  ],
]
  .reduce<[ValidationOptions, any][]>((list, [options, expected]) => {
    [true, false].forEach((enabled) => {
      list.push([
        { ...options, enabled } as ValidationOptions,
        { ...expected, enabled },
      ]);
    });
    return list;
  }, [])
  .map(([options, expected]) => {
    const opts: any = { ...options };
    if (opts.parent) {
      opts.parent = validator(opts.parent);
    }
    return [JSON.stringify(options), opts, expected] as [
      string,
      ValidationOptions,
      any
    ];
  });
