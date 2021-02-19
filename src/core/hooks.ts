import { Observable } from '../interfaces';
import { _getHooks } from './modules';
import { _Observer, _Observable } from './objects';
import { _setToArray } from './utils';

const initialObject = {};

export function _useObservable(observables: ReadonlyArray<Observable<any>>) {
  const { useMemo, useEffect, useState } = _getHooks();
  const observers = useMemo(() => {
    const processedObjects = new Set<_Observable<any>>();
    observables.forEach((obj) => {
      if (obj instanceof _Observable) {
        processedObjects.add(obj);
      }
    });
    return _setToArray(processedObjects).map(
      (obj) => [{}, obj] as [_Observer, _Observable<any>]
    );
  }, []);

  if (observers.length) {
    const [, update] = useState(initialObject);

    observers.forEach(([observer]) => {
      observer._update = update;
    });

    useEffect(() => {
      observers.forEach(([observer, obj]) => {
        obj._observerSet.add(observer);
      });
      return () => {
        observers.forEach(([observer, obj]) => {
          obj._observerSet.delete(observer);
        });
      };
    }, []);
  }
}
