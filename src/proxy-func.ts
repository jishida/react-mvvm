import {
  DependencyValue,
  Mandatory,
  Observable,
  Ref,
  Result,
  ViewModel,
  ViewModelObject,
} from './interfaces';
import { Validatable } from './validators';
import {
  RefProxy,
  ResultProxy,
  StateProxy,
  ValueProxy,
  ViewModelMutableProxy,
  ViewModelProxy,
} from './proxy';

export interface ProxyFunc {
  <VM extends ViewModel>(viewModel: VM, filter: 'ref'): RefProxy<VM>;
  <VM extends ViewModel>(viewModel: VM, filter: 'value'): ValueProxy<VM>;
  <VM extends ViewModel>(viewModel: VM, filter: 'state'): StateProxy<VM>;
  <VM extends ViewModel>(viewModel: VM, filter: 'result'): ResultProxy<VM>;
  <VM extends ViewModel>(viewModel: VM, filter: 'error'): ViewModelMutableProxy<
    VM,
    boolean,
    Validatable<any, any>
  >;
  <VM extends ViewModel>(
    viewModel: VM,
    filter: 'message'
  ): ViewModelMutableProxy<VM, string, Validatable<any, any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    getFn: (prop: ViewModelObject) => T
  ): ViewModelProxy<VM, T, ViewModelObject>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    getFn: (this: VM, prop: ViewModelObject, name: string) => T,
    setFn: (this: VM, prop: ViewModelObject, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, ViewModelObject>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: {},
    getFn: (prop: ViewModelObject) => T
  ): ViewModelProxy<VM, T, ViewModelObject, void>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: {},
    getFn: (this: VM, prop: ViewModelObject, name: string) => T,
    setFn: (this: VM, prop: ViewModelObject, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, ViewModelObject, void>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref', false>,
    getFn: (prop: ViewModelObject) => T
  ): ViewModelProxy<VM, T, ViewModelObject, Ref<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref', false>,
    getFn: (this: VM, prop: ViewModelObject, name: string) => T,
    setFn: (this: VM, prop: ViewModelObject, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, ViewModelObject, Ref<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'result', false>,
    getFn: (prop: ViewModelObject) => T
  ): ViewModelProxy<VM, T, ViewModelObject, Result<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'result', false>,
    getFn: (this: VM, prop: ViewModelObject, name: string) => T,
    setFn: (this: VM, prop: ViewModelObject, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, ViewModelObject, Result<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref' | 'result', false>,
    getFn: (prop: ViewModelObject) => T
  ): ViewModelProxy<VM, T, ViewModelObject, Ref<any> | Result<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref' | 'result', false>,
    getFn: (this: VM, prop: ViewModelObject, name: string) => T,
    setFn: (this: VM, prop: ViewModelObject, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, ViewModelObject, Ref<any> | Result<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', false>,
    getFn: (prop: ViewModelObject) => T
  ): ViewModelProxy<VM, T, ViewModelObject, DependencyValue<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', false>,
    getFn: (this: VM, prop: ViewModelObject, name: string) => T,
    setFn: (this: VM, prop: ViewModelObject, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, ViewModelObject, DependencyValue<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'ref', false>,
    getFn: (prop: ViewModelObject) => T
  ): ViewModelProxy<VM, T, ViewModelObject, DependencyValue<any> | Ref<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'ref', false>,
    getFn: (this: VM, prop: ViewModelObject, name: string) => T,
    setFn: (this: VM, prop: ViewModelObject, name: string, value: T) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    ViewModelObject,
    DependencyValue<any> | Ref<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'result', false>,
    getFn: (prop: ViewModelObject) => T
  ): ViewModelProxy<VM, T, ViewModelObject, DependencyValue<any> | Result<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'result', false>,
    getFn: (this: VM, prop: ViewModelObject, name: string) => T,
    setFn: (this: VM, prop: ViewModelObject, name: string, value: T) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    ViewModelObject,
    DependencyValue<any> | Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'ref' | 'result', false>,
    getFn: (prop: ViewModelObject) => T
  ): ViewModelProxy<
    VM,
    T,
    ViewModelObject,
    DependencyValue<any> | Ref<any> | Result<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'ref' | 'result', false>,
    getFn: (this: VM, prop: ViewModelObject, name: string) => T,
    setFn: (this: VM, prop: ViewModelObject, name: string, value: T) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    ViewModelObject,
    DependencyValue<any> | Ref<any> | Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable', false>,
    getFn: (prop: ViewModelObject) => T
  ): ViewModelProxy<VM, T, ViewModelObject, Observable<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable', false>,
    getFn: (this: VM, prop: ViewModelObject, name: string) => T,
    setFn: (this: VM, prop: ViewModelObject, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, ViewModelObject, Observable<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'ref', false>,
    getFn: (prop: ViewModelObject) => T
  ): ViewModelProxy<VM, T, ViewModelObject, Observable<any> | Ref<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'ref', false>,
    getFn: (this: VM, prop: ViewModelObject, name: string) => T,
    setFn: (this: VM, prop: ViewModelObject, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, ViewModelObject, Observable<any> | Ref<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'result', false>,
    getFn: (prop: ViewModelObject) => T
  ): ViewModelProxy<VM, T, ViewModelObject, Observable<any> | Result<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'result', false>,
    getFn: (this: VM, prop: ViewModelObject, name: string) => T,
    setFn: (this: VM, prop: ViewModelObject, name: string, value: T) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    ViewModelObject,
    Observable<any> | Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'ref' | 'result', false>,
    getFn: (prop: ViewModelObject) => T
  ): ViewModelProxy<
    VM,
    T,
    ViewModelObject,
    Observable<any> | Ref<any> | Result<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'ref' | 'result', false>,
    getFn: (this: VM, prop: ViewModelObject, name: string) => T,
    setFn: (this: VM, prop: ViewModelObject, name: string, value: T) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    ViewModelObject,
    Observable<any> | Ref<any> | Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable', false>,
    getFn: (prop: ViewModelObject) => T
  ): ViewModelProxy<VM, T, ViewModelObject, Validatable<any, any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable', false>,
    getFn: (this: VM, prop: ViewModelObject, name: string) => T,
    setFn: (this: VM, prop: ViewModelObject, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, ViewModelObject, Validatable<any, any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable' | 'ref', false>,
    getFn: (prop: ViewModelObject) => T
  ): ViewModelProxy<VM, T, ViewModelObject, Validatable<any, any> | Ref<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable' | 'ref', false>,
    getFn: (this: VM, prop: ViewModelObject, name: string) => T,
    setFn: (this: VM, prop: ViewModelObject, name: string, value: T) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    ViewModelObject,
    Validatable<any, any> | Ref<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable' | 'result', false>,
    getFn: (prop: ViewModelObject) => T
  ): ViewModelProxy<
    VM,
    T,
    ViewModelObject,
    Validatable<any, any> | Result<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable' | 'result', false>,
    getFn: (this: VM, prop: ViewModelObject, name: string) => T,
    setFn: (this: VM, prop: ViewModelObject, name: string, value: T) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    ViewModelObject,
    Validatable<any, any> | Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable' | 'ref' | 'result', false>,
    getFn: (prop: ViewModelObject) => T
  ): ViewModelProxy<
    VM,
    T,
    ViewModelObject,
    Validatable<any, any> | Ref<any> | Result<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable' | 'ref' | 'result', false>,
    getFn: (this: VM, prop: ViewModelObject, name: string) => T,
    setFn: (this: VM, prop: ViewModelObject, name: string, value: T) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    ViewModelObject,
    Validatable<any, any> | Ref<any> | Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'async', false>,
    getFn: (prop: ViewModelObject) => T
  ): ViewModelProxy<VM, T, ViewModelObject, Validatable<any, true>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'async', false>,
    getFn: (this: VM, prop: ViewModelObject, name: string) => T,
    setFn: (this: VM, prop: ViewModelObject, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, ViewModelObject, Validatable<any, true>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'async' | 'ref', false>,
    getFn: (prop: ViewModelObject) => T
  ): ViewModelProxy<VM, T, ViewModelObject, Validatable<any, true> | Ref<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'async' | 'ref', false>,
    getFn: (this: VM, prop: ViewModelObject, name: string) => T,
    setFn: (this: VM, prop: ViewModelObject, name: string, value: T) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    ViewModelObject,
    Validatable<any, true> | Ref<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'async' | 'result', false>,
    getFn: (prop: ViewModelObject) => T
  ): ViewModelProxy<
    VM,
    T,
    ViewModelObject,
    Validatable<any, true> | Result<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'async' | 'result', false>,
    getFn: (this: VM, prop: ViewModelObject, name: string) => T,
    setFn: (this: VM, prop: ViewModelObject, name: string, value: T) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    ViewModelObject,
    Validatable<any, true> | Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'async' | 'ref' | 'result', false>,
    getFn: (prop: ViewModelObject) => T
  ): ViewModelProxy<
    VM,
    T,
    ViewModelObject,
    Validatable<any, true> | Ref<any> | Result<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'async' | 'ref' | 'result', false>,
    getFn: (this: VM, prop: ViewModelObject, name: string) => T,
    setFn: (this: VM, prop: ViewModelObject, name: string, value: T) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    ViewModelObject,
    Validatable<any, true> | Ref<any> | Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref', true>,
    getFn: (prop: Ref<any>) => T
  ): ViewModelProxy<VM, T, Ref<any>, void>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref', true>,
    getFn: (this: VM, prop: Ref<any>, name: string) => T,
    setFn: (this: VM, prop: Ref<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, Ref<any>, void>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref', true> & Mandatory<'result', false>,
    getFn: (prop: Ref<any>) => T
  ): ViewModelProxy<VM, T, Ref<any>, Result<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref', true> & Mandatory<'result', false>,
    getFn: (this: VM, prop: Ref<any>, name: string) => T,
    setFn: (this: VM, prop: Ref<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, Ref<any>, Result<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref', true> & Mandatory<'value', false>,
    getFn: (prop: Ref<any>) => T
  ): ViewModelProxy<VM, T, Ref<any>, DependencyValue<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref', true> & Mandatory<'value', false>,
    getFn: (this: VM, prop: Ref<any>, name: string) => T,
    setFn: (this: VM, prop: Ref<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, Ref<any>, DependencyValue<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref', true> & Mandatory<'value' | 'result', false>,
    getFn: (prop: Ref<any>) => T
  ): ViewModelProxy<VM, T, Ref<any>, DependencyValue<any> | Result<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref', true> & Mandatory<'value' | 'result', false>,
    getFn: (this: VM, prop: Ref<any>, name: string) => T,
    setFn: (this: VM, prop: Ref<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, Ref<any>, DependencyValue<any> | Result<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref', true> & Mandatory<'observable', false>,
    getFn: (prop: Ref<any>) => T
  ): ViewModelProxy<VM, T, Ref<any>, Observable<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref', true> & Mandatory<'observable', false>,
    getFn: (this: VM, prop: Ref<any>, name: string) => T,
    setFn: (this: VM, prop: Ref<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, Ref<any>, Observable<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref', true> & Mandatory<'observable' | 'result', false>,
    getFn: (prop: Ref<any>) => T
  ): ViewModelProxy<VM, T, Ref<any>, Observable<any> | Result<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref', true> & Mandatory<'observable' | 'result', false>,
    getFn: (this: VM, prop: Ref<any>, name: string) => T,
    setFn: (this: VM, prop: Ref<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, Ref<any>, Observable<any> | Result<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref', true> & Mandatory<'validatable', false>,
    getFn: (prop: Ref<any>) => T
  ): ViewModelProxy<VM, T, Ref<any>, Validatable<any, any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref', true> & Mandatory<'validatable', false>,
    getFn: (this: VM, prop: Ref<any>, name: string) => T,
    setFn: (this: VM, prop: Ref<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, Ref<any>, Validatable<any, any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref', true> & Mandatory<'validatable' | 'result', false>,
    getFn: (prop: Ref<any>) => T
  ): ViewModelProxy<VM, T, Ref<any>, Validatable<any, any> | Result<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref', true> & Mandatory<'validatable' | 'result', false>,
    getFn: (this: VM, prop: Ref<any>, name: string) => T,
    setFn: (this: VM, prop: Ref<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Ref<any>,
    Validatable<any, any> | Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref', true> & Mandatory<'async', false>,
    getFn: (prop: Ref<any>) => T
  ): ViewModelProxy<VM, T, Ref<any>, Validatable<any, true>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref', true> & Mandatory<'async', false>,
    getFn: (this: VM, prop: Ref<any>, name: string) => T,
    setFn: (this: VM, prop: Ref<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, Ref<any>, Validatable<any, true>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref', true> & Mandatory<'async' | 'result', false>,
    getFn: (prop: Ref<any>) => T
  ): ViewModelProxy<VM, T, Ref<any>, Validatable<any, true> | Result<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref', true> & Mandatory<'async' | 'result', false>,
    getFn: (this: VM, prop: Ref<any>, name: string) => T,
    setFn: (this: VM, prop: Ref<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Ref<any>,
    Validatable<any, true> | Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'result', true>,
    getFn: (prop: Result<any>) => T
  ): ViewModelProxy<VM, T, Result<any>, void>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'result', true>,
    getFn: (this: VM, prop: Result<any>, name: string) => T,
    setFn: (this: VM, prop: Result<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, Result<any>, void>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'result', true> & Mandatory<'ref', false>,
    getFn: (prop: Result<any>) => T
  ): ViewModelProxy<VM, T, Result<any>, Ref<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'result', true> & Mandatory<'ref', false>,
    getFn: (this: VM, prop: Result<any>, name: string) => T,
    setFn: (this: VM, prop: Result<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, Result<any>, Ref<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'result', true> & Mandatory<'value', false>,
    getFn: (prop: Result<any>) => T
  ): ViewModelProxy<VM, T, Result<any>, DependencyValue<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'result', true> & Mandatory<'value', false>,
    getFn: (this: VM, prop: Result<any>, name: string) => T,
    setFn: (this: VM, prop: Result<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, Result<any>, DependencyValue<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'result', true> & Mandatory<'value' | 'ref', false>,
    getFn: (prop: Result<any>) => T
  ): ViewModelProxy<VM, T, Result<any>, DependencyValue<any> | Ref<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'result', true> & Mandatory<'value' | 'ref', false>,
    getFn: (this: VM, prop: Result<any>, name: string) => T,
    setFn: (this: VM, prop: Result<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, Result<any>, DependencyValue<any> | Ref<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'result', true> & Mandatory<'observable', false>,
    getFn: (prop: Result<any>) => T
  ): ViewModelProxy<VM, T, Result<any>, Observable<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'result', true> & Mandatory<'observable', false>,
    getFn: (this: VM, prop: Result<any>, name: string) => T,
    setFn: (this: VM, prop: Result<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, Result<any>, Observable<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'result', true> & Mandatory<'observable' | 'ref', false>,
    getFn: (prop: Result<any>) => T
  ): ViewModelProxy<VM, T, Result<any>, Observable<any> | Ref<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'result', true> & Mandatory<'observable' | 'ref', false>,
    getFn: (this: VM, prop: Result<any>, name: string) => T,
    setFn: (this: VM, prop: Result<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, Result<any>, Observable<any> | Ref<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'result', true> & Mandatory<'validatable', false>,
    getFn: (prop: Result<any>) => T
  ): ViewModelProxy<VM, T, Result<any>, Validatable<any, any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'result', true> & Mandatory<'validatable', false>,
    getFn: (this: VM, prop: Result<any>, name: string) => T,
    setFn: (this: VM, prop: Result<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, Result<any>, Validatable<any, any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'result', true> & Mandatory<'validatable' | 'ref', false>,
    getFn: (prop: Result<any>) => T
  ): ViewModelProxy<VM, T, Result<any>, Validatable<any, any> | Ref<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'result', true> & Mandatory<'validatable' | 'ref', false>,
    getFn: (this: VM, prop: Result<any>, name: string) => T,
    setFn: (this: VM, prop: Result<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Result<any>,
    Validatable<any, any> | Ref<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'result', true> & Mandatory<'async', false>,
    getFn: (prop: Result<any>) => T
  ): ViewModelProxy<VM, T, Result<any>, Validatable<any, true>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'result', true> & Mandatory<'async', false>,
    getFn: (this: VM, prop: Result<any>, name: string) => T,
    setFn: (this: VM, prop: Result<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, Result<any>, Validatable<any, true>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'result', true> & Mandatory<'async' | 'ref', false>,
    getFn: (prop: Result<any>) => T
  ): ViewModelProxy<VM, T, Result<any>, Validatable<any, true> | Ref<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'result', true> & Mandatory<'async' | 'ref', false>,
    getFn: (this: VM, prop: Result<any>, name: string) => T,
    setFn: (this: VM, prop: Result<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Result<any>,
    Validatable<any, true> | Ref<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref' | 'result', true>,
    getFn: (prop: Ref<any> & Result<any>) => T
  ): ViewModelProxy<VM, T, Ref<any> & Result<any>, void>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref' | 'result', true>,
    getFn: (this: VM, prop: Ref<any> & Result<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: Ref<any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<VM, T, Ref<any> & Result<any>, void>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref' | 'result', true> & Mandatory<'value', false>,
    getFn: (prop: Ref<any> & Result<any>) => T
  ): ViewModelProxy<VM, T, Ref<any> & Result<any>, DependencyValue<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref' | 'result', true> & Mandatory<'value', false>,
    getFn: (this: VM, prop: Ref<any> & Result<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: Ref<any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<VM, T, Ref<any> & Result<any>, DependencyValue<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref' | 'result', true> & Mandatory<'observable', false>,
    getFn: (prop: Ref<any> & Result<any>) => T
  ): ViewModelProxy<VM, T, Ref<any> & Result<any>, Observable<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref' | 'result', true> & Mandatory<'observable', false>,
    getFn: (this: VM, prop: Ref<any> & Result<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: Ref<any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<VM, T, Ref<any> & Result<any>, Observable<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref' | 'result', true> & Mandatory<'validatable', false>,
    getFn: (prop: Ref<any> & Result<any>) => T
  ): ViewModelProxy<VM, T, Ref<any> & Result<any>, Validatable<any, any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref' | 'result', true> & Mandatory<'validatable', false>,
    getFn: (this: VM, prop: Ref<any> & Result<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: Ref<any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Ref<any> & Result<any>,
    Validatable<any, any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref' | 'result', true> & Mandatory<'async', false>,
    getFn: (prop: Ref<any> & Result<any>) => T
  ): ViewModelProxy<VM, T, Ref<any> & Result<any>, Validatable<any, true>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'ref' | 'result', true> & Mandatory<'async', false>,
    getFn: (this: VM, prop: Ref<any> & Result<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: Ref<any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Ref<any> & Result<any>,
    Validatable<any, true>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true>,
    getFn: (prop: DependencyValue<any>) => T
  ): ViewModelProxy<VM, T, DependencyValue<any>, void>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true>,
    getFn: (this: VM, prop: DependencyValue<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<VM, T, DependencyValue<any>, void>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true> & Mandatory<'ref', false>,
    getFn: (prop: DependencyValue<any>) => T
  ): ViewModelProxy<VM, T, DependencyValue<any>, Ref<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true> & Mandatory<'ref', false>,
    getFn: (this: VM, prop: DependencyValue<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<VM, T, DependencyValue<any>, Ref<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true> & Mandatory<'result', false>,
    getFn: (prop: DependencyValue<any>) => T
  ): ViewModelProxy<VM, T, DependencyValue<any>, Result<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true> & Mandatory<'result', false>,
    getFn: (this: VM, prop: DependencyValue<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<VM, T, DependencyValue<any>, Result<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true> & Mandatory<'ref' | 'result', false>,
    getFn: (prop: DependencyValue<any>) => T
  ): ViewModelProxy<VM, T, DependencyValue<any>, Ref<any> | Result<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true> & Mandatory<'ref' | 'result', false>,
    getFn: (this: VM, prop: DependencyValue<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<VM, T, DependencyValue<any>, Ref<any> | Result<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true> & Mandatory<'observable', false>,
    getFn: (prop: DependencyValue<any>) => T
  ): ViewModelProxy<VM, T, DependencyValue<any>, Observable<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true> & Mandatory<'observable', false>,
    getFn: (this: VM, prop: DependencyValue<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<VM, T, DependencyValue<any>, Observable<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true> & Mandatory<'observable' | 'ref', false>,
    getFn: (prop: DependencyValue<any>) => T
  ): ViewModelProxy<VM, T, DependencyValue<any>, Observable<any> | Ref<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true> & Mandatory<'observable' | 'ref', false>,
    getFn: (this: VM, prop: DependencyValue<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    DependencyValue<any>,
    Observable<any> | Ref<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true> &
      Mandatory<'observable' | 'result', false>,
    getFn: (prop: DependencyValue<any>) => T
  ): ViewModelProxy<VM, T, DependencyValue<any>, Observable<any> | Result<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true> &
      Mandatory<'observable' | 'result', false>,
    getFn: (this: VM, prop: DependencyValue<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    DependencyValue<any>,
    Observable<any> | Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true> &
      Mandatory<'observable' | 'ref' | 'result', false>,
    getFn: (prop: DependencyValue<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    DependencyValue<any>,
    Observable<any> | Ref<any> | Result<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true> &
      Mandatory<'observable' | 'ref' | 'result', false>,
    getFn: (this: VM, prop: DependencyValue<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    DependencyValue<any>,
    Observable<any> | Ref<any> | Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true> & Mandatory<'validatable', false>,
    getFn: (prop: DependencyValue<any>) => T
  ): ViewModelProxy<VM, T, DependencyValue<any>, Validatable<any, any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true> & Mandatory<'validatable', false>,
    getFn: (this: VM, prop: DependencyValue<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<VM, T, DependencyValue<any>, Validatable<any, any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true> & Mandatory<'validatable' | 'ref', false>,
    getFn: (prop: DependencyValue<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    DependencyValue<any>,
    Validatable<any, any> | Ref<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true> & Mandatory<'validatable' | 'ref', false>,
    getFn: (this: VM, prop: DependencyValue<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    DependencyValue<any>,
    Validatable<any, any> | Ref<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true> &
      Mandatory<'validatable' | 'result', false>,
    getFn: (prop: DependencyValue<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    DependencyValue<any>,
    Validatable<any, any> | Result<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true> &
      Mandatory<'validatable' | 'result', false>,
    getFn: (this: VM, prop: DependencyValue<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    DependencyValue<any>,
    Validatable<any, any> | Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true> &
      Mandatory<'validatable' | 'ref' | 'result', false>,
    getFn: (prop: DependencyValue<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    DependencyValue<any>,
    Validatable<any, any> | Ref<any> | Result<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true> &
      Mandatory<'validatable' | 'ref' | 'result', false>,
    getFn: (this: VM, prop: DependencyValue<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    DependencyValue<any>,
    Validatable<any, any> | Ref<any> | Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true> & Mandatory<'async', false>,
    getFn: (prop: DependencyValue<any>) => T
  ): ViewModelProxy<VM, T, DependencyValue<any>, Validatable<any, true>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true> & Mandatory<'async', false>,
    getFn: (this: VM, prop: DependencyValue<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<VM, T, DependencyValue<any>, Validatable<any, true>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true> & Mandatory<'async' | 'ref', false>,
    getFn: (prop: DependencyValue<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    DependencyValue<any>,
    Validatable<any, true> | Ref<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true> & Mandatory<'async' | 'ref', false>,
    getFn: (this: VM, prop: DependencyValue<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    DependencyValue<any>,
    Validatable<any, true> | Ref<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true> & Mandatory<'async' | 'result', false>,
    getFn: (prop: DependencyValue<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    DependencyValue<any>,
    Validatable<any, true> | Result<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true> & Mandatory<'async' | 'result', false>,
    getFn: (this: VM, prop: DependencyValue<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    DependencyValue<any>,
    Validatable<any, true> | Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true> &
      Mandatory<'async' | 'ref' | 'result', false>,
    getFn: (prop: DependencyValue<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    DependencyValue<any>,
    Validatable<any, true> | Ref<any> | Result<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value', true> &
      Mandatory<'async' | 'ref' | 'result', false>,
    getFn: (this: VM, prop: DependencyValue<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    DependencyValue<any>,
    Validatable<any, true> | Ref<any> | Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'ref', true>,
    getFn: (prop: DependencyValue<any> & Ref<any>) => T
  ): ViewModelProxy<VM, T, DependencyValue<any> & Ref<any>, void>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'ref', true>,
    getFn: (this: VM, prop: DependencyValue<any> & Ref<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any> & Ref<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<VM, T, DependencyValue<any> & Ref<any>, void>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'ref', true> & Mandatory<'result', false>,
    getFn: (prop: DependencyValue<any> & Ref<any>) => T
  ): ViewModelProxy<VM, T, DependencyValue<any> & Ref<any>, Result<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'ref', true> & Mandatory<'result', false>,
    getFn: (this: VM, prop: DependencyValue<any> & Ref<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any> & Ref<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<VM, T, DependencyValue<any> & Ref<any>, Result<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'ref', true> & Mandatory<'observable', false>,
    getFn: (prop: DependencyValue<any> & Ref<any>) => T
  ): ViewModelProxy<VM, T, DependencyValue<any> & Ref<any>, Observable<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'ref', true> & Mandatory<'observable', false>,
    getFn: (this: VM, prop: DependencyValue<any> & Ref<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any> & Ref<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    DependencyValue<any> & Ref<any>,
    Observable<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'ref', true> &
      Mandatory<'observable' | 'result', false>,
    getFn: (prop: DependencyValue<any> & Ref<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    DependencyValue<any> & Ref<any>,
    Observable<any> | Result<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'ref', true> &
      Mandatory<'observable' | 'result', false>,
    getFn: (this: VM, prop: DependencyValue<any> & Ref<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any> & Ref<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    DependencyValue<any> & Ref<any>,
    Observable<any> | Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'ref', true> & Mandatory<'validatable', false>,
    getFn: (prop: DependencyValue<any> & Ref<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    DependencyValue<any> & Ref<any>,
    Validatable<any, any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'ref', true> & Mandatory<'validatable', false>,
    getFn: (this: VM, prop: DependencyValue<any> & Ref<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any> & Ref<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    DependencyValue<any> & Ref<any>,
    Validatable<any, any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'ref', true> &
      Mandatory<'validatable' | 'result', false>,
    getFn: (prop: DependencyValue<any> & Ref<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    DependencyValue<any> & Ref<any>,
    Validatable<any, any> | Result<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'ref', true> &
      Mandatory<'validatable' | 'result', false>,
    getFn: (this: VM, prop: DependencyValue<any> & Ref<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any> & Ref<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    DependencyValue<any> & Ref<any>,
    Validatable<any, any> | Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'ref', true> & Mandatory<'async', false>,
    getFn: (prop: DependencyValue<any> & Ref<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    DependencyValue<any> & Ref<any>,
    Validatable<any, true>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'ref', true> & Mandatory<'async', false>,
    getFn: (this: VM, prop: DependencyValue<any> & Ref<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any> & Ref<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    DependencyValue<any> & Ref<any>,
    Validatable<any, true>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'ref', true> &
      Mandatory<'async' | 'result', false>,
    getFn: (prop: DependencyValue<any> & Ref<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    DependencyValue<any> & Ref<any>,
    Validatable<any, true> | Result<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'ref', true> &
      Mandatory<'async' | 'result', false>,
    getFn: (this: VM, prop: DependencyValue<any> & Ref<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any> & Ref<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    DependencyValue<any> & Ref<any>,
    Validatable<any, true> | Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'result', true>,
    getFn: (prop: DependencyValue<any> & Result<any>) => T
  ): ViewModelProxy<VM, T, DependencyValue<any> & Result<any>, void>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'result', true>,
    getFn: (
      this: VM,
      prop: DependencyValue<any> & Result<any>,
      name: string
    ) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<VM, T, DependencyValue<any> & Result<any>, void>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'result', true> & Mandatory<'ref', false>,
    getFn: (prop: DependencyValue<any> & Result<any>) => T
  ): ViewModelProxy<VM, T, DependencyValue<any> & Result<any>, Ref<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'result', true> & Mandatory<'ref', false>,
    getFn: (
      this: VM,
      prop: DependencyValue<any> & Result<any>,
      name: string
    ) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<VM, T, DependencyValue<any> & Result<any>, Ref<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'result', true> &
      Mandatory<'observable', false>,
    getFn: (prop: DependencyValue<any> & Result<any>) => T
  ): ViewModelProxy<VM, T, DependencyValue<any> & Result<any>, Observable<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'result', true> &
      Mandatory<'observable', false>,
    getFn: (
      this: VM,
      prop: DependencyValue<any> & Result<any>,
      name: string
    ) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    DependencyValue<any> & Result<any>,
    Observable<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'result', true> &
      Mandatory<'observable' | 'ref', false>,
    getFn: (prop: DependencyValue<any> & Result<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    DependencyValue<any> & Result<any>,
    Observable<any> | Ref<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'result', true> &
      Mandatory<'observable' | 'ref', false>,
    getFn: (
      this: VM,
      prop: DependencyValue<any> & Result<any>,
      name: string
    ) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    DependencyValue<any> & Result<any>,
    Observable<any> | Ref<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'result', true> &
      Mandatory<'validatable', false>,
    getFn: (prop: DependencyValue<any> & Result<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    DependencyValue<any> & Result<any>,
    Validatable<any, any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'result', true> &
      Mandatory<'validatable', false>,
    getFn: (
      this: VM,
      prop: DependencyValue<any> & Result<any>,
      name: string
    ) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    DependencyValue<any> & Result<any>,
    Validatable<any, any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'result', true> &
      Mandatory<'validatable' | 'ref', false>,
    getFn: (prop: DependencyValue<any> & Result<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    DependencyValue<any> & Result<any>,
    Validatable<any, any> | Ref<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'result', true> &
      Mandatory<'validatable' | 'ref', false>,
    getFn: (
      this: VM,
      prop: DependencyValue<any> & Result<any>,
      name: string
    ) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    DependencyValue<any> & Result<any>,
    Validatable<any, any> | Ref<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'result', true> & Mandatory<'async', false>,
    getFn: (prop: DependencyValue<any> & Result<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    DependencyValue<any> & Result<any>,
    Validatable<any, true>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'result', true> & Mandatory<'async', false>,
    getFn: (
      this: VM,
      prop: DependencyValue<any> & Result<any>,
      name: string
    ) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    DependencyValue<any> & Result<any>,
    Validatable<any, true>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'result', true> &
      Mandatory<'async' | 'ref', false>,
    getFn: (prop: DependencyValue<any> & Result<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    DependencyValue<any> & Result<any>,
    Validatable<any, true> | Ref<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'result', true> &
      Mandatory<'async' | 'ref', false>,
    getFn: (
      this: VM,
      prop: DependencyValue<any> & Result<any>,
      name: string
    ) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    DependencyValue<any> & Result<any>,
    Validatable<any, true> | Ref<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'ref' | 'result', true>,
    getFn: (prop: DependencyValue<any> & Ref<any> & Result<any>) => T
  ): ViewModelProxy<VM, T, DependencyValue<any> & Ref<any> & Result<any>, void>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'ref' | 'result', true>,
    getFn: (
      this: VM,
      prop: DependencyValue<any> & Ref<any> & Result<any>,
      name: string
    ) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any> & Ref<any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    DependencyValue<any> & Ref<any> & Result<any>,
    void
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'ref' | 'result', true> &
      Mandatory<'observable', false>,
    getFn: (prop: DependencyValue<any> & Ref<any> & Result<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    DependencyValue<any> & Ref<any> & Result<any>,
    Observable<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'ref' | 'result', true> &
      Mandatory<'observable', false>,
    getFn: (
      this: VM,
      prop: DependencyValue<any> & Ref<any> & Result<any>,
      name: string
    ) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any> & Ref<any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    DependencyValue<any> & Ref<any> & Result<any>,
    Observable<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'ref' | 'result', true> &
      Mandatory<'validatable', false>,
    getFn: (prop: DependencyValue<any> & Ref<any> & Result<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    DependencyValue<any> & Ref<any> & Result<any>,
    Validatable<any, any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'ref' | 'result', true> &
      Mandatory<'validatable', false>,
    getFn: (
      this: VM,
      prop: DependencyValue<any> & Ref<any> & Result<any>,
      name: string
    ) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any> & Ref<any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    DependencyValue<any> & Ref<any> & Result<any>,
    Validatable<any, any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'ref' | 'result', true> &
      Mandatory<'async', false>,
    getFn: (prop: DependencyValue<any> & Ref<any> & Result<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    DependencyValue<any> & Ref<any> & Result<any>,
    Validatable<any, true>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'value' | 'ref' | 'result', true> &
      Mandatory<'async', false>,
    getFn: (
      this: VM,
      prop: DependencyValue<any> & Ref<any> & Result<any>,
      name: string
    ) => T,
    setFn: (
      this: VM,
      prop: DependencyValue<any> & Ref<any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    DependencyValue<any> & Ref<any> & Result<any>,
    Validatable<any, true>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable', true>,
    getFn: (prop: Observable<any>) => T
  ): ViewModelProxy<VM, T, Observable<any>, void>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable', true>,
    getFn: (this: VM, prop: Observable<any>, name: string) => T,
    setFn: (this: VM, prop: Observable<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, Observable<any>, void>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable', true> & Mandatory<'ref', false>,
    getFn: (prop: Observable<any>) => T
  ): ViewModelProxy<VM, T, Observable<any>, Ref<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable', true> & Mandatory<'ref', false>,
    getFn: (this: VM, prop: Observable<any>, name: string) => T,
    setFn: (this: VM, prop: Observable<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, Observable<any>, Ref<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable', true> & Mandatory<'result', false>,
    getFn: (prop: Observable<any>) => T
  ): ViewModelProxy<VM, T, Observable<any>, Result<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable', true> & Mandatory<'result', false>,
    getFn: (this: VM, prop: Observable<any>, name: string) => T,
    setFn: (this: VM, prop: Observable<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, Observable<any>, Result<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable', true> & Mandatory<'ref' | 'result', false>,
    getFn: (prop: Observable<any>) => T
  ): ViewModelProxy<VM, T, Observable<any>, Ref<any> | Result<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable', true> & Mandatory<'ref' | 'result', false>,
    getFn: (this: VM, prop: Observable<any>, name: string) => T,
    setFn: (this: VM, prop: Observable<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, Observable<any>, Ref<any> | Result<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable', true> & Mandatory<'validatable', false>,
    getFn: (prop: Observable<any>) => T
  ): ViewModelProxy<VM, T, Observable<any>, Validatable<any, any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable', true> & Mandatory<'validatable', false>,
    getFn: (this: VM, prop: Observable<any>, name: string) => T,
    setFn: (this: VM, prop: Observable<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, Observable<any>, Validatable<any, any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable', true> &
      Mandatory<'validatable' | 'ref', false>,
    getFn: (prop: Observable<any>) => T
  ): ViewModelProxy<VM, T, Observable<any>, Validatable<any, any> | Ref<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable', true> &
      Mandatory<'validatable' | 'ref', false>,
    getFn: (this: VM, prop: Observable<any>, name: string) => T,
    setFn: (this: VM, prop: Observable<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Observable<any>,
    Validatable<any, any> | Ref<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable', true> &
      Mandatory<'validatable' | 'result', false>,
    getFn: (prop: Observable<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    Observable<any>,
    Validatable<any, any> | Result<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable', true> &
      Mandatory<'validatable' | 'result', false>,
    getFn: (this: VM, prop: Observable<any>, name: string) => T,
    setFn: (this: VM, prop: Observable<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Observable<any>,
    Validatable<any, any> | Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable', true> &
      Mandatory<'validatable' | 'ref' | 'result', false>,
    getFn: (prop: Observable<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    Observable<any>,
    Validatable<any, any> | Ref<any> | Result<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable', true> &
      Mandatory<'validatable' | 'ref' | 'result', false>,
    getFn: (this: VM, prop: Observable<any>, name: string) => T,
    setFn: (this: VM, prop: Observable<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Observable<any>,
    Validatable<any, any> | Ref<any> | Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable', true> & Mandatory<'async', false>,
    getFn: (prop: Observable<any>) => T
  ): ViewModelProxy<VM, T, Observable<any>, Validatable<any, true>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable', true> & Mandatory<'async', false>,
    getFn: (this: VM, prop: Observable<any>, name: string) => T,
    setFn: (this: VM, prop: Observable<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<VM, T, Observable<any>, Validatable<any, true>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable', true> & Mandatory<'async' | 'ref', false>,
    getFn: (prop: Observable<any>) => T
  ): ViewModelProxy<VM, T, Observable<any>, Validatable<any, true> | Ref<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable', true> & Mandatory<'async' | 'ref', false>,
    getFn: (this: VM, prop: Observable<any>, name: string) => T,
    setFn: (this: VM, prop: Observable<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Observable<any>,
    Validatable<any, true> | Ref<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable', true> &
      Mandatory<'async' | 'result', false>,
    getFn: (prop: Observable<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    Observable<any>,
    Validatable<any, true> | Result<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable', true> &
      Mandatory<'async' | 'result', false>,
    getFn: (this: VM, prop: Observable<any>, name: string) => T,
    setFn: (this: VM, prop: Observable<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Observable<any>,
    Validatable<any, true> | Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable', true> &
      Mandatory<'async' | 'ref' | 'result', false>,
    getFn: (prop: Observable<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    Observable<any>,
    Validatable<any, true> | Ref<any> | Result<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable', true> &
      Mandatory<'async' | 'ref' | 'result', false>,
    getFn: (this: VM, prop: Observable<any>, name: string) => T,
    setFn: (this: VM, prop: Observable<any>, name: string, value: T) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Observable<any>,
    Validatable<any, true> | Ref<any> | Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'ref', true>,
    getFn: (prop: Observable<any> & Ref<any>) => T
  ): ViewModelProxy<VM, T, Observable<any> & Ref<any>, void>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'ref', true>,
    getFn: (this: VM, prop: Observable<any> & Ref<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: Observable<any> & Ref<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<VM, T, Observable<any> & Ref<any>, void>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'ref', true> & Mandatory<'result', false>,
    getFn: (prop: Observable<any> & Ref<any>) => T
  ): ViewModelProxy<VM, T, Observable<any> & Ref<any>, Result<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'ref', true> & Mandatory<'result', false>,
    getFn: (this: VM, prop: Observable<any> & Ref<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: Observable<any> & Ref<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<VM, T, Observable<any> & Ref<any>, Result<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'ref', true> &
      Mandatory<'validatable', false>,
    getFn: (prop: Observable<any> & Ref<any>) => T
  ): ViewModelProxy<VM, T, Observable<any> & Ref<any>, Validatable<any, any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'ref', true> &
      Mandatory<'validatable', false>,
    getFn: (this: VM, prop: Observable<any> & Ref<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: Observable<any> & Ref<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Observable<any> & Ref<any>,
    Validatable<any, any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'ref', true> &
      Mandatory<'validatable' | 'result', false>,
    getFn: (prop: Observable<any> & Ref<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    Observable<any> & Ref<any>,
    Validatable<any, any> | Result<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'ref', true> &
      Mandatory<'validatable' | 'result', false>,
    getFn: (this: VM, prop: Observable<any> & Ref<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: Observable<any> & Ref<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Observable<any> & Ref<any>,
    Validatable<any, any> | Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'ref', true> & Mandatory<'async', false>,
    getFn: (prop: Observable<any> & Ref<any>) => T
  ): ViewModelProxy<VM, T, Observable<any> & Ref<any>, Validatable<any, true>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'ref', true> & Mandatory<'async', false>,
    getFn: (this: VM, prop: Observable<any> & Ref<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: Observable<any> & Ref<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Observable<any> & Ref<any>,
    Validatable<any, true>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'ref', true> &
      Mandatory<'async' | 'result', false>,
    getFn: (prop: Observable<any> & Ref<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    Observable<any> & Ref<any>,
    Validatable<any, true> | Result<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'ref', true> &
      Mandatory<'async' | 'result', false>,
    getFn: (this: VM, prop: Observable<any> & Ref<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: Observable<any> & Ref<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Observable<any> & Ref<any>,
    Validatable<any, true> | Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'result', true>,
    getFn: (prop: Observable<any> & Result<any>) => T
  ): ViewModelProxy<VM, T, Observable<any> & Result<any>, void>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'result', true>,
    getFn: (this: VM, prop: Observable<any> & Result<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: Observable<any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<VM, T, Observable<any> & Result<any>, void>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'result', true> & Mandatory<'ref', false>,
    getFn: (prop: Observable<any> & Result<any>) => T
  ): ViewModelProxy<VM, T, Observable<any> & Result<any>, Ref<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'result', true> & Mandatory<'ref', false>,
    getFn: (this: VM, prop: Observable<any> & Result<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: Observable<any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<VM, T, Observable<any> & Result<any>, Ref<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'result', true> &
      Mandatory<'validatable', false>,
    getFn: (prop: Observable<any> & Result<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    Observable<any> & Result<any>,
    Validatable<any, any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'result', true> &
      Mandatory<'validatable', false>,
    getFn: (this: VM, prop: Observable<any> & Result<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: Observable<any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Observable<any> & Result<any>,
    Validatable<any, any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'result', true> &
      Mandatory<'validatable' | 'ref', false>,
    getFn: (prop: Observable<any> & Result<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    Observable<any> & Result<any>,
    Validatable<any, any> | Ref<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'result', true> &
      Mandatory<'validatable' | 'ref', false>,
    getFn: (this: VM, prop: Observable<any> & Result<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: Observable<any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Observable<any> & Result<any>,
    Validatable<any, any> | Ref<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'result', true> &
      Mandatory<'async', false>,
    getFn: (prop: Observable<any> & Result<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    Observable<any> & Result<any>,
    Validatable<any, true>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'result', true> &
      Mandatory<'async', false>,
    getFn: (this: VM, prop: Observable<any> & Result<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: Observable<any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Observable<any> & Result<any>,
    Validatable<any, true>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'result', true> &
      Mandatory<'async' | 'ref', false>,
    getFn: (prop: Observable<any> & Result<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    Observable<any> & Result<any>,
    Validatable<any, true> | Ref<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'result', true> &
      Mandatory<'async' | 'ref', false>,
    getFn: (this: VM, prop: Observable<any> & Result<any>, name: string) => T,
    setFn: (
      this: VM,
      prop: Observable<any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Observable<any> & Result<any>,
    Validatable<any, true> | Ref<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'ref' | 'result', true>,
    getFn: (prop: Observable<any> & Ref<any> & Result<any>) => T
  ): ViewModelProxy<VM, T, Observable<any> & Ref<any> & Result<any>, void>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'ref' | 'result', true>,
    getFn: (
      this: VM,
      prop: Observable<any> & Ref<any> & Result<any>,
      name: string
    ) => T,
    setFn: (
      this: VM,
      prop: Observable<any> & Ref<any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Observable<any> & Ref<any> & Result<any>,
    void
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'ref' | 'result', true> &
      Mandatory<'validatable', false>,
    getFn: (prop: Observable<any> & Ref<any> & Result<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    Observable<any> & Ref<any> & Result<any>,
    Validatable<any, any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'ref' | 'result', true> &
      Mandatory<'validatable', false>,
    getFn: (
      this: VM,
      prop: Observable<any> & Ref<any> & Result<any>,
      name: string
    ) => T,
    setFn: (
      this: VM,
      prop: Observable<any> & Ref<any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Observable<any> & Ref<any> & Result<any>,
    Validatable<any, any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'ref' | 'result', true> &
      Mandatory<'async', false>,
    getFn: (prop: Observable<any> & Ref<any> & Result<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    Observable<any> & Ref<any> & Result<any>,
    Validatable<any, true>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'observable' | 'ref' | 'result', true> &
      Mandatory<'async', false>,
    getFn: (
      this: VM,
      prop: Observable<any> & Ref<any> & Result<any>,
      name: string
    ) => T,
    setFn: (
      this: VM,
      prop: Observable<any> & Ref<any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Observable<any> & Ref<any> & Result<any>,
    Validatable<any, true>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable', true>,
    getFn: (prop: Validatable<any, any>) => T
  ): ViewModelProxy<VM, T, Validatable<any, any>, void>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable', true>,
    getFn: (this: VM, prop: Validatable<any, any>, name: string) => T,
    setFn: (
      this: VM,
      prop: Validatable<any, any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<VM, T, Validatable<any, any>, void>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable', true> & Mandatory<'ref', false>,
    getFn: (prop: Validatable<any, any>) => T
  ): ViewModelProxy<VM, T, Validatable<any, any>, Ref<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable', true> & Mandatory<'ref', false>,
    getFn: (this: VM, prop: Validatable<any, any>, name: string) => T,
    setFn: (
      this: VM,
      prop: Validatable<any, any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<VM, T, Validatable<any, any>, Ref<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable', true> & Mandatory<'result', false>,
    getFn: (prop: Validatable<any, any>) => T
  ): ViewModelProxy<VM, T, Validatable<any, any>, Result<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable', true> & Mandatory<'result', false>,
    getFn: (this: VM, prop: Validatable<any, any>, name: string) => T,
    setFn: (
      this: VM,
      prop: Validatable<any, any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<VM, T, Validatable<any, any>, Result<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable', true> & Mandatory<'ref' | 'result', false>,
    getFn: (prop: Validatable<any, any>) => T
  ): ViewModelProxy<VM, T, Validatable<any, any>, Ref<any> | Result<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable', true> & Mandatory<'ref' | 'result', false>,
    getFn: (this: VM, prop: Validatable<any, any>, name: string) => T,
    setFn: (
      this: VM,
      prop: Validatable<any, any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Validatable<any, any>,
    Ref<any> | Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable', true> & Mandatory<'async', false>,
    getFn: (prop: Validatable<any, any>) => T
  ): ViewModelProxy<VM, T, Validatable<any, any>, Validatable<any, true>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable', true> & Mandatory<'async', false>,
    getFn: (this: VM, prop: Validatable<any, any>, name: string) => T,
    setFn: (
      this: VM,
      prop: Validatable<any, any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Validatable<any, any>,
    Validatable<any, true>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable', true> & Mandatory<'async' | 'ref', false>,
    getFn: (prop: Validatable<any, any>) => T
  ): ViewModelProxy<
    VM,
    T,
    Validatable<any, any>,
    Validatable<any, true> | Ref<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable', true> & Mandatory<'async' | 'ref', false>,
    getFn: (this: VM, prop: Validatable<any, any>, name: string) => T,
    setFn: (
      this: VM,
      prop: Validatable<any, any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Validatable<any, any>,
    Validatable<any, true> | Ref<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable', true> &
      Mandatory<'async' | 'result', false>,
    getFn: (prop: Validatable<any, any>) => T
  ): ViewModelProxy<
    VM,
    T,
    Validatable<any, any>,
    Validatable<any, true> | Result<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable', true> &
      Mandatory<'async' | 'result', false>,
    getFn: (this: VM, prop: Validatable<any, any>, name: string) => T,
    setFn: (
      this: VM,
      prop: Validatable<any, any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Validatable<any, any>,
    Validatable<any, true> | Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable', true> &
      Mandatory<'async' | 'ref' | 'result', false>,
    getFn: (prop: Validatable<any, any>) => T
  ): ViewModelProxy<
    VM,
    T,
    Validatable<any, any>,
    Validatable<any, true> | Ref<any> | Result<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable', true> &
      Mandatory<'async' | 'ref' | 'result', false>,
    getFn: (this: VM, prop: Validatable<any, any>, name: string) => T,
    setFn: (
      this: VM,
      prop: Validatable<any, any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Validatable<any, any>,
    Validatable<any, true> | Ref<any> | Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable' | 'ref', true>,
    getFn: (prop: Validatable<any, any> & Ref<any>) => T
  ): ViewModelProxy<VM, T, Validatable<any, any> & Ref<any>, void>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable' | 'ref', true>,
    getFn: (
      this: VM,
      prop: Validatable<any, any> & Ref<any>,
      name: string
    ) => T,
    setFn: (
      this: VM,
      prop: Validatable<any, any> & Ref<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<VM, T, Validatable<any, any> & Ref<any>, void>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable' | 'ref', true> & Mandatory<'result', false>,
    getFn: (prop: Validatable<any, any> & Ref<any>) => T
  ): ViewModelProxy<VM, T, Validatable<any, any> & Ref<any>, Result<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable' | 'ref', true> & Mandatory<'result', false>,
    getFn: (
      this: VM,
      prop: Validatable<any, any> & Ref<any>,
      name: string
    ) => T,
    setFn: (
      this: VM,
      prop: Validatable<any, any> & Ref<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Validatable<any, any> & Ref<any>,
    Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable' | 'ref', true> & Mandatory<'async', false>,
    getFn: (prop: Validatable<any, any> & Ref<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    Validatable<any, any> & Ref<any>,
    Validatable<any, true>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable' | 'ref', true> & Mandatory<'async', false>,
    getFn: (
      this: VM,
      prop: Validatable<any, any> & Ref<any>,
      name: string
    ) => T,
    setFn: (
      this: VM,
      prop: Validatable<any, any> & Ref<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Validatable<any, any> & Ref<any>,
    Validatable<any, true>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable' | 'ref', true> &
      Mandatory<'async' | 'result', false>,
    getFn: (prop: Validatable<any, any> & Ref<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    Validatable<any, any> & Ref<any>,
    Validatable<any, true> | Result<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable' | 'ref', true> &
      Mandatory<'async' | 'result', false>,
    getFn: (
      this: VM,
      prop: Validatable<any, any> & Ref<any>,
      name: string
    ) => T,
    setFn: (
      this: VM,
      prop: Validatable<any, any> & Ref<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Validatable<any, any> & Ref<any>,
    Validatable<any, true> | Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable' | 'result', true>,
    getFn: (prop: Validatable<any, any> & Result<any>) => T
  ): ViewModelProxy<VM, T, Validatable<any, any> & Result<any>, void>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable' | 'result', true>,
    getFn: (
      this: VM,
      prop: Validatable<any, any> & Result<any>,
      name: string
    ) => T,
    setFn: (
      this: VM,
      prop: Validatable<any, any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<VM, T, Validatable<any, any> & Result<any>, void>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable' | 'result', true> & Mandatory<'ref', false>,
    getFn: (prop: Validatable<any, any> & Result<any>) => T
  ): ViewModelProxy<VM, T, Validatable<any, any> & Result<any>, Ref<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable' | 'result', true> & Mandatory<'ref', false>,
    getFn: (
      this: VM,
      prop: Validatable<any, any> & Result<any>,
      name: string
    ) => T,
    setFn: (
      this: VM,
      prop: Validatable<any, any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Validatable<any, any> & Result<any>,
    Ref<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable' | 'result', true> &
      Mandatory<'async', false>,
    getFn: (prop: Validatable<any, any> & Result<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    Validatable<any, any> & Result<any>,
    Validatable<any, true>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable' | 'result', true> &
      Mandatory<'async', false>,
    getFn: (
      this: VM,
      prop: Validatable<any, any> & Result<any>,
      name: string
    ) => T,
    setFn: (
      this: VM,
      prop: Validatable<any, any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Validatable<any, any> & Result<any>,
    Validatable<any, true>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable' | 'result', true> &
      Mandatory<'async' | 'ref', false>,
    getFn: (prop: Validatable<any, any> & Result<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    Validatable<any, any> & Result<any>,
    Validatable<any, true> | Ref<any>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable' | 'result', true> &
      Mandatory<'async' | 'ref', false>,
    getFn: (
      this: VM,
      prop: Validatable<any, any> & Result<any>,
      name: string
    ) => T,
    setFn: (
      this: VM,
      prop: Validatable<any, any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Validatable<any, any> & Result<any>,
    Validatable<any, true> | Ref<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable' | 'ref' | 'result', true>,
    getFn: (prop: Validatable<any, any> & Ref<any> & Result<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    Validatable<any, any> & Ref<any> & Result<any>,
    void
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable' | 'ref' | 'result', true>,
    getFn: (
      this: VM,
      prop: Validatable<any, any> & Ref<any> & Result<any>,
      name: string
    ) => T,
    setFn: (
      this: VM,
      prop: Validatable<any, any> & Ref<any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Validatable<any, any> & Ref<any> & Result<any>,
    void
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable' | 'ref' | 'result', true> &
      Mandatory<'async', false>,
    getFn: (prop: Validatable<any, any> & Ref<any> & Result<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    Validatable<any, any> & Ref<any> & Result<any>,
    Validatable<any, true>
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'validatable' | 'ref' | 'result', true> &
      Mandatory<'async', false>,
    getFn: (
      this: VM,
      prop: Validatable<any, any> & Ref<any> & Result<any>,
      name: string
    ) => T,
    setFn: (
      this: VM,
      prop: Validatable<any, any> & Ref<any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Validatable<any, any> & Ref<any> & Result<any>,
    Validatable<any, true>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'async', true>,
    getFn: (prop: Validatable<any, true>) => T
  ): ViewModelProxy<VM, T, Validatable<any, true>, void>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'async', true>,
    getFn: (this: VM, prop: Validatable<any, true>, name: string) => T,
    setFn: (
      this: VM,
      prop: Validatable<any, true>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<VM, T, Validatable<any, true>, void>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'async', true> & Mandatory<'ref', false>,
    getFn: (prop: Validatable<any, true>) => T
  ): ViewModelProxy<VM, T, Validatable<any, true>, Ref<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'async', true> & Mandatory<'ref', false>,
    getFn: (this: VM, prop: Validatable<any, true>, name: string) => T,
    setFn: (
      this: VM,
      prop: Validatable<any, true>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<VM, T, Validatable<any, true>, Ref<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'async', true> & Mandatory<'result', false>,
    getFn: (prop: Validatable<any, true>) => T
  ): ViewModelProxy<VM, T, Validatable<any, true>, Result<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'async', true> & Mandatory<'result', false>,
    getFn: (this: VM, prop: Validatable<any, true>, name: string) => T,
    setFn: (
      this: VM,
      prop: Validatable<any, true>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<VM, T, Validatable<any, true>, Result<any>>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'async', true> & Mandatory<'ref' | 'result', false>,
    getFn: (prop: Validatable<any, true>) => T
  ): ViewModelProxy<VM, T, Validatable<any, true>, Ref<any> | Result<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'async', true> & Mandatory<'ref' | 'result', false>,
    getFn: (this: VM, prop: Validatable<any, true>, name: string) => T,
    setFn: (
      this: VM,
      prop: Validatable<any, true>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Validatable<any, true>,
    Ref<any> | Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'async' | 'ref', true>,
    getFn: (prop: Validatable<any, true> & Ref<any>) => T
  ): ViewModelProxy<VM, T, Validatable<any, true> & Ref<any>, void>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'async' | 'ref', true>,
    getFn: (
      this: VM,
      prop: Validatable<any, true> & Ref<any>,
      name: string
    ) => T,
    setFn: (
      this: VM,
      prop: Validatable<any, true> & Ref<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<VM, T, Validatable<any, true> & Ref<any>, void>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'async' | 'ref', true> & Mandatory<'result', false>,
    getFn: (prop: Validatable<any, true> & Ref<any>) => T
  ): ViewModelProxy<VM, T, Validatable<any, true> & Ref<any>, Result<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'async' | 'ref', true> & Mandatory<'result', false>,
    getFn: (
      this: VM,
      prop: Validatable<any, true> & Ref<any>,
      name: string
    ) => T,
    setFn: (
      this: VM,
      prop: Validatable<any, true> & Ref<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Validatable<any, true> & Ref<any>,
    Result<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'async' | 'result', true>,
    getFn: (prop: Validatable<any, true> & Result<any>) => T
  ): ViewModelProxy<VM, T, Validatable<any, true> & Result<any>, void>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'async' | 'result', true>,
    getFn: (
      this: VM,
      prop: Validatable<any, true> & Result<any>,
      name: string
    ) => T,
    setFn: (
      this: VM,
      prop: Validatable<any, true> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<VM, T, Validatable<any, true> & Result<any>, void>;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'async' | 'result', true> & Mandatory<'ref', false>,
    getFn: (prop: Validatable<any, true> & Result<any>) => T
  ): ViewModelProxy<VM, T, Validatable<any, true> & Result<any>, Ref<any>>;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'async' | 'result', true> & Mandatory<'ref', false>,
    getFn: (
      this: VM,
      prop: Validatable<any, true> & Result<any>,
      name: string
    ) => T,
    setFn: (
      this: VM,
      prop: Validatable<any, true> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Validatable<any, true> & Result<any>,
    Ref<any>
  >;

  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'async' | 'ref' | 'result', true>,
    getFn: (prop: Validatable<any, true> & Ref<any> & Result<any>) => T
  ): ViewModelProxy<
    VM,
    T,
    Validatable<any, true> & Ref<any> & Result<any>,
    void
  >;
  <VM extends ViewModel, T = unknown>(
    viewModel: VM,
    filter: Mandatory<'async' | 'ref' | 'result', true>,
    getFn: (
      this: VM,
      prop: Validatable<any, true> & Ref<any> & Result<any>,
      name: string
    ) => T,
    setFn: (
      this: VM,
      prop: Validatable<any, true> & Ref<any> & Result<any>,
      name: string,
      value: T
    ) => void
  ): ViewModelMutableProxy<
    VM,
    T,
    Validatable<any, true> & Ref<any> & Result<any>,
    void
  >;
}
