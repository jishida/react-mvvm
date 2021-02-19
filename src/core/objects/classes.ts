import { Observable, ObservableOptions } from '../../interfaces';
import _ViewModelObject from './ViewModelObject';
import _Observable from './Observable';
import _ResultMixin from './ResultMixin';
import _RefMixin from './RefMixin';
import { _getClassIndex } from '../utils';
import { _ObservableOptions } from './interfaces';

export const _Ref = _RefMixin(_ViewModelObject);

type ObservableClass<V> = new (
  options: _ObservableOptions<V>
) => _ViewModelObject & Observable<V>;

const observableClasses = new Array<ObservableClass<any>>(4);

export function _getObservableClass<V>(options?: ObservableOptions) {
  const opts = options || {};
  const key = _getClassIndex(opts);
  let cls: ObservableClass<V> = observableClasses[key];
  if (!cls) {
    cls = _Observable;
    if (opts.result !== false) {
      cls = _ResultMixin<V, _ObservableOptions<V>, []>(cls) as any;
    }
    if (opts.ref) {
      cls = _RefMixin<unknown, _ObservableOptions<V>, []>(cls) as any;
    }
    observableClasses[key] = cls;
  }
  return cls;
}

export * from './computedClasses';
