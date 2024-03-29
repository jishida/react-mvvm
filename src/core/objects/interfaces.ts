import { ComputedOptions } from '../../interfaces';

export interface _ViewModelObjectOptions {
  _vmObjType?: number;
}

export interface _ObservableOptions<V> extends _ViewModelObjectOptions {
  _initialValue: V;
}

export type _ComputedOptions = _ViewModelObjectOptions & ComputedOptions;
