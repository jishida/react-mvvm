import React from 'react';
import { Observable } from '../interfaces';
import { _emptyArray } from './utils';

interface Observer {
  _setState(value: {}): void;
  _update(): void;
}

const initialState = {};

function getUseBindData(this: ReadonlyArray<Observable<any>>) {
  const observer = {} as Observer;
  observer._update = () => {
    observer._setState({});
  };
  return [
    observer,
    () => {
      this.forEach((observable) => {
        observable.onNotify.add(observer._update);
      });
      return () => {
        this.forEach((observable) => {
          observable.onNotify.remove(observer._update);
        });
      };
    },
  ] as [Observer, () => () => void];
}

export function _useBind(observables: ReadonlyArray<Observable<any>>) {
  if (observables.length) {
    const [observer, effect] = React.useMemo(
      getUseBindData.bind(observables),
      _emptyArray
    );

    [, observer._setState] = React.useState(initialState);

    React.useEffect(effect, _emptyArray);
  }
}
