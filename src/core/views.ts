import React, { createElement, FunctionComponent, ReactElement } from 'react';
import { DependencyValue } from '../interfaces';
import { BindComponent, BindProps } from '../views';
import { _useBind } from './hooks';
import { _getHooks } from './modules';
import { _assign, _emptyArray } from './utils';
import { _DependencyValue, _Observable } from './objects';

function getBindData(this: BindProps<any, any>) {
  let childrenIsArray = false;
  const observables: _Observable<any>[] = [];
  const entries: [string, number, DependencyValue<unknown>][] = [];
  function addProp(prop: any, name: string, index?: number) {
    if (prop instanceof _DependencyValue) {
      prop.deps.forEach((dep) => {
        if (!(dep instanceof _Observable)) {
          throw new Error('Illegal Observable instance');
        }
        if (!observables.some((o) => o === dep)) {
          observables.push(dep);
        }
      });
      entries.push([
        name,
        index === undefined ? -1 : index,
        prop as DependencyValue<unknown>,
      ]);
    }
  }
  Object.keys(this).forEach((name) => {
    const prop = this[name];
    switch (name) {
      case '$type':
        break;
      case 'children':
        if (Array.isArray(prop)) {
          childrenIsArray = true;
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
  return [observables, entries, childrenIsArray] as [
    _Observable<any>[],
    [string, number, DependencyValue<unknown>][],
    boolean
  ];
}

function createBindElement(props: BindProps<any, any>, ref?: any) {
  const { useMemo } = _getHooks();
  const [observables, entries, childrenIsArray] = useMemo(
    getBindData.bind(props),
    _emptyArray
  );
  _useBind(observables);
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

const { memo } = React as {
  memo?: (base: BindComponent) => BindComponent;
};

const { forwardRef } = React as {
  forwardRef?: (
    render: (props: any, ref: any) => ReactElement | null
  ) => FunctionComponent;
};

export function _createBindComponent() {
  const component = (typeof forwardRef === 'function'
    ? forwardRef((props: any, ref: any) => createBindElement(props, ref))
    : (props: any) => createBindElement(props)) as BindComponent;
  return typeof memo === 'function' ? memo(component) : component;
}
