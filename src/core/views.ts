import React, { FunctionComponent, ReactElement } from 'react';
import { DependencyValue, Observable } from '../interfaces';
import { BindComponent, BindProps } from '../views';
import { _useBind } from './hooks';
import { _assign, _emptyArray, _isViewModelObject } from './utils';

function getBindData(this: BindProps<any, any>) {
  let childrenIsArray = false;
  const observables: Observable<any>[] = [];
  const entries: [string, number, DependencyValue<unknown>][] = [];
  function addProp(prop: any, name: string, index?: number) {
    if (_isViewModelObject(prop) && (prop.$$vmObjType & 0x03) === 0x03) {
      (prop as DependencyValue<any>).deps.forEach((dep) => {
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
    Observable<any>[],
    [string, number, DependencyValue<unknown>][],
    boolean
  ];
}

function createBindElement(props: BindProps<any, any>, ref?: any) {
  const [observables, entries, childrenIsArray] = React.useMemo(
    getBindData.bind(props),
    _emptyArray
  );
  _useBind(observables);
  const p = _assign({}, props, (name) => name !== '$type');
  const { $type } = props;
  if (ref !== undefined) {
    p.ref = ref;
  }
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
  return React.createElement($type, p);
}

export function _createBindComponent(displayName: string) {
  const { memo } = React as {
    memo?: (base: BindComponent) => BindComponent;
  };

  const { forwardRef } = React as {
    forwardRef?: (
      render: (props: any, ref: any) => ReactElement | null
    ) => FunctionComponent;
  };

  const component = (typeof forwardRef === 'function'
    ? forwardRef((props: any, ref: any) => createBindElement(props, ref))
    : (props: any) => createBindElement(props)) as BindComponent;
  component.displayName = displayName;
  return typeof memo === 'function' ? memo(component) : component;
}
