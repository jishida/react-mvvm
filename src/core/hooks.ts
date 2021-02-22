import { Observable } from '../interfaces';
import { _getHooks } from './modules';
import { _Observable } from './objects';
import { _emptyArray, _setToArray } from './utils';

interface Observer {
  _setState(value: {}): void;
  _update(): void;
}

const initialState = {};

function getUseObservableData(this: ReadonlyArray<Observable<any>>) {
  const observableSet = new Set<_Observable<any>>();
  this.forEach((obj) => {
    if (obj instanceof _Observable) {
      observableSet.add(obj);
    }
  });
  const observerBase = {} as Observer;
  observerBase._update = () => {
    observerBase._setState({});
  };
  const observers = _setToArray(observableSet).map(
    (obj) => [observerBase, obj] as [Observer, _Observable<any>]
  );
  return [
    () => {
      observers.forEach(([observer, obj]) => {
        obj.onNotify.add(observer._update);
      });
      return () => {
        observers.forEach(([o, obj]) => {
          obj.onNotify.remove(o._update);
        });
      };
    },
    observers,
  ] as [() => () => void, [Observer, _Observable<any>][]];
}

export function _useObservable(observables: ReadonlyArray<Observable<any>>) {
  const { useMemo, useEffect, useState } = _getHooks();

  const [effect, observers] = useMemo(
    getUseObservableData.bind(observables),
    _emptyArray
  );

  if (observers.length) {
    const [, setState] = useState(initialState);

    observers.forEach(([observer]) => {
      observer._setState = setState;
    });

    useEffect(effect, _emptyArray);
  }
}
