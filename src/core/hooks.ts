import { Observable } from '../interfaces';
import { _getHooks } from './modules';
import { _Observable } from './objects';
import { _setToArray } from './utils';

const initialObject = {};

interface Observer {
  _setState(value: {}): void;
  _update(): void;
}

export function _useObservable(observables: ReadonlyArray<Observable<any>>) {
  const { useMemo, useEffect, useState } = _getHooks();
  const observers = useMemo(() => {
    const processedObjects = new Set<_Observable<any>>();
    observables.forEach((obj) => {
      if (obj instanceof _Observable) {
        processedObjects.add(obj);
      }
    });
    const observer = {} as Observer;
    observer._update = () => {
      observer._setState({});
    };
    return _setToArray(processedObjects).map(
      (obj) => [observer, obj] as [Observer, _Observable<any>]
    );
  }, []);

  if (observers.length) {
    const [, setState] = useState(initialObject);

    observers.forEach(([observer]) => {
      observer._setState = setState;
    });

    useEffect(() => {
      observers.forEach(([observer, obj]) => {
        obj.onNotify.add(observer._update);
      });
      return () => {
        observers.forEach(([observer, obj]) => {
          obj.onNotify.remove(observer._update);
        });
      };
    }, []);
  }
}
