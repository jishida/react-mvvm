import _AsyncParsableMixin from './AsyncParsableMixin';
import _AsyncValidatableMixin from './AsyncValidatableMixin';
import _AsyncValidatableResultMixin from './AsyncValidatableResultMixin';
import {
  _Observable,
  _RefMixin,
  _ViewModelObject,
  _getMinimalClassIndex,
  _getClassIndex,
} from '../../core';
import _ParsableMixin from './ParsableMixin';
import _ValidatableMixin from './ValidatableMixin';
import _ValidatableResultMixin from './ValidatableResultMixin';
import {
  ParsableOptions,
  Validatable,
  ValidatableOptions,
} from '../../validators';
import { Result } from '../../interfaces';
import { _ValidatableOptions } from './interfaces';

const _Validatable = _ValidatableMixin(_Observable);
const _Parsable = _ParsableMixin(_Observable);

const _AsyncValidatable = _AsyncValidatableMixin(_Observable);
const _AsyncParsable = _AsyncParsableMixin(_Observable);

function _getValidatableClassIndex(options: ValidatableOptions) {
  let index = _getClassIndex(options);
  if (options.async) {
    index |= 0x4;
  }
  return index;
}

function _getParsableClassIndex(options: ParsableOptions) {
  let index = _getMinimalClassIndex(options);
  if (options.async) {
    index |= 0x2;
  }
  return index;
}

type ValidatableClass<V, Async extends boolean = boolean> = new (
  options: _ValidatableOptions<V, boolean | void, Async>
) => _ViewModelObject & Validatable<V, Async>;

const validatableClasses = new Array<ValidatableClass<any>>(8);

export function _getValidatableClass<V>(options?: ValidatableOptions) {
  const opts = options || {};
  const key = _getValidatableClassIndex(opts);
  let cls: ValidatableClass<V> = validatableClasses[key];
  if (!cls) {
    cls = (opts.async
      ? _AsyncValidatable
      : _Validatable) as ValidatableClass<V>;
    if (opts.result !== false) {
      cls = opts.async
        ? (_AsyncValidatableResultMixin<V>(
            cls as ValidatableClass<V, true>
          ) as ValidatableClass<V, true>)
        : (_ValidatableResultMixin(
            cls as ValidatableClass<V, false>
          ) as ValidatableClass<V, false>);
    }
    if (opts.ref) {
      cls = _RefMixin<any, _ValidatableOptions<V, boolean | void, any>, []>(
        cls
      ) as any;
    }
    validatableClasses[key] = cls;
  }
  return cls;
}

type ParsableClass<V, R, Async extends boolean = boolean> = new (
  options: _ValidatableOptions<V, R, Async>
) => _ViewModelObject & Validatable<V, Async> & Result<R>;

const parsableClasses = new Array<ParsableClass<any, any>>(4);

export function _getParsableClass<V, R>(options?: ParsableOptions) {
  const opts = options || {};
  const key = _getParsableClassIndex(opts);
  let cls: ParsableClass<V, R> = parsableClasses[key];
  if (!cls) {
    cls = (opts.async ? _AsyncParsable : _Parsable) as ParsableClass<V, R>;
    if (opts.ref) {
      cls = _RefMixin<any, _ValidatableOptions<V, R, any>, []>(cls) as any;
    }
    parsableClasses[key] = cls;
  }
  return cls;
}
