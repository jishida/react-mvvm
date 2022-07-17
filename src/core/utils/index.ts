import { ObservableOptions, ViewModelObject } from '../../interfaces';
import { _ViewModelObjectOptions } from '../objects/interfaces';

export { default as _Container } from './Container';

export const _is =
  Object.is ||
  ((x: any, y: any) =>
    // eslint-disable-next-line no-self-compare
    x === y ? x !== 0 || 1 / x === 1 / y : x !== x && y !== y);

export function _assign<T extends {}, S extends {}>(
  target: T,
  source: S | undefined,
  filter?: (name: string) => boolean
): T & S {
  if (source) {
    Object.keys(source).forEach((prop) => {
      if (!filter || filter(prop)) {
        (target as any)[prop] = (source as any)[prop];
      }
    });
  }
  return target as T & S;
}

export function _applyBias<O extends _ViewModelObjectOptions>(
  bias: number,
  options?: O
) {
  const opts: _ViewModelObjectOptions = options || {};
  opts._vmObjType = (opts._vmObjType || 0) | bias;
  return opts as O;
}

export function _getMinimalClassIndex(options: ObservableOptions) {
  let index = 0x0;
  if (options.ref) {
    index |= 0x1;
  }
  return index;
}

export function _getClassIndex(options: ObservableOptions) {
  let index = _getMinimalClassIndex(options);
  if (options.result === false) {
    index |= 0x2;
  }
  return index;
}

export function _argsToArray(args: IArguments, start?: number) {
  return Array.prototype.slice.call(args, start);
}

export const _emptyArray = [];

export function _isViewModelObject(value: any): value is ViewModelObject {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const t = value.$$vmObjType;
  return typeof t === 'number' && Number.isFinite(t);
}
