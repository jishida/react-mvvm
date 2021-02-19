import React, { createElement, FunctionComponent, ReactElement } from 'react';
import { DependencyValue, Observable } from '../interfaces';
import { BindComponent, BindProps } from '../views';
import { _useObservable } from './hooks';
import { _getHooks } from './modules';
import { _assign, _setToArray } from './utils';
import { _DependencyValue } from './objects';

function createBindElement(props: BindProps<any, any>, ref?: any) {
  const { useMemo } = _getHooks();
  const [observables, entries, childrenIsArray] = useMemo(() => {
    let childrenIsArr = false;
    const observableSet: Set<Observable<any>> = new Set();
    const entryArr: [string, number, DependencyValue<unknown>][] = [];
    function addProp(prop: any, name: string, index?: number) {
      if (prop instanceof _DependencyValue) {
        prop.deps.forEach((dep) => {
          observableSet.add(dep);
        });
        entryArr.push([
          name,
          index === undefined ? -1 : index,
          prop as DependencyValue<unknown>,
        ]);
      }
    }
    Object.keys(props).forEach((name) => {
      const prop = props[name];
      switch (name) {
        case '$type':
          break;
        case 'children':
          if (Array.isArray(prop)) {
            childrenIsArr = true;
            prop.forEach((p, i) => {
              addProp(p, name, i);
            });
            break;
          }
        // fallthrough
        default:
          addProp(prop, name);
      }
    });
    return [_setToArray(observableSet), entryArr, childrenIsArr];
  }, []);
  _useObservable(observables);
  const p = _assign({}, props, (name) => name !== '$type');
  const { $type } = props;
  p.ref = ref;
  if (childrenIsArray) {
    p.children = props.children.slice();
  }
  entries.forEach(([name, i, prop]) => {
    if (name === 'children' && i >= 0) {
      p[name][i] = prop.value;
    } else {
      p[name] = prop.value;
    }
  });
  return createElement($type, p);
}

const { forwardRef } = React as {
  forwardRef?: (
    render: (props: any, ref: any) => ReactElement | null
  ) => FunctionComponent;
};

export function _createBindComponent() {
  return (typeof forwardRef === 'function'
    ? forwardRef((props: any, ref: any) => createBindElement(props, ref))
    : (props: any) => createBindElement(props)) as BindComponent;
}
