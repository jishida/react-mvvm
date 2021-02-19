import {
  ReactElement,
  ReactHTML,
  ReactSVG,
  FunctionComponent,
  Component,
  ComponentClass,
  ClassAttributes,
  HTMLAttributes,
  SVGAttributes,
  DOMAttributes,
  Attributes,
  DetailedHTMLFactory,
} from 'react';
import { DependencyValue } from './interfaces';

export type BindProp<T> = T | DependencyValue<T>;

export type BindChildrenBase<C, T extends [...any[]]> = C extends [
  infer S,
  ...infer U
]
  ? T extends [...infer V]
    ? BindChildrenBase<[...U], [...V, BindProp<S>]>
    : never
  : C extends []
  ? T
  : C extends Array<infer V>
  ? Array<BindProp<V>>
  : BindProp<C>;

export type BindChildren<C> = BindChildrenBase<C, []>;

export interface BindBaseProps<T> {
  $type: T;
}

export type BindProps<T, P extends {}> = {
  [K in keyof P as K extends '$type' | 'key' | 'ref'
    ? never
    : K]: K extends 'children' ? BindChildren<P[K]> : BindProp<P[K]>;
} &
  BindBaseProps<T>;

export type HTMLBindProps<
  T extends keyof ReactHTML
> = ReactHTML[T] extends DetailedHTMLFactory<infer P, infer E>
  ? BindProps<T, P> & ClassAttributes<E>
  : BindProps<T, HTMLAttributes<HTMLElement>> & ClassAttributes<HTMLElement>;
export type SVGBindProps = BindProps<
  keyof ReactSVG,
  SVGAttributes<SVGElement>
> &
  ClassAttributes<SVGElement>;
export type DOMBindProps<
  P extends DOMAttributes<T>,
  T extends Element
> = BindProps<string, P> & ClassAttributes<T>;
export type FunctionComponentBindProps<P> = BindProps<FunctionComponent<P>, P> &
  Attributes;
export type ComponentBindProps<
  P,
  T extends Component<P, any>,
  C extends ComponentClass<P, any>
> = BindProps<C & (new (props: P, context?: any) => T), P> & ClassAttributes<T>;

export interface BindComponent {
  <T extends keyof ReactHTML>(props: HTMLBindProps<T>): ReactElement;
  (props: SVGBindProps): ReactElement;
  <P extends {}, T extends Component<P, any>, C extends ComponentClass<P, any>>(
    props: ComponentBindProps<P, T, C>
  ): ReactElement;
  <P>(props: FunctionComponentBindProps<P>): ReactElement;
  displayName: string;
}

export interface DOMBindComponent {
  <P extends DOMAttributes<T>, T extends Element>(
    props: DOMBindProps<P, T>
  ): ReactElement;
  displayName: string;
}
