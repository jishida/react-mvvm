import { ObservableOptions } from '@jishida/react-mvvm';

export type OptionKeyParams = 'ref' | 'result' | 'async';

export type OptionKey<
  T extends OptionKeyParams[],
  S extends string = ''
> = T extends [infer U, ...infer V]
  ? U extends string
    ? V extends OptionKeyParams[]
      ? S extends ''
        ? OptionKey<[...V], U>
        : OptionKey<[...V], `${S}:${U}`>
      : never
    : never
  : S;

export type ObservableOptionKeys =
  | 'none'
  | OptionKey<['ref']>
  | OptionKey<['result']>
  | OptionKey<['ref', 'result']>;

export function getObservableOptions(keys: ObservableOptionKeys) {
  const options: ObservableOptions = {
    ref: false,
    result: false,
  };
  keys.split(':').forEach((key) => {
    switch (key) {
      case 'ref':
      case 'result':
        (options as any)[key] = true;
      // no default
    }
  });
  return options;
}

export const observableOptionKeys: ObservableOptionKeys[] = [
  'none',
  'ref',
  'result',
  'ref:result',
];
