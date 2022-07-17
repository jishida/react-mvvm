import {
  Observable,
  Ref,
  Result,
  ViewModel,
  ViewModelObject,
} from '../interfaces';
import { BuiltinProxyFilter, ProxyFilter, ViewModelProxy } from '../proxy';
import { Validatable } from '../validators';
import { _isViewModelObject } from '../core';

function testObjType<O extends ViewModelObject | void>(
  prop: any,
  filter: number,
  compareFn: (n: number) => boolean
): prop is O {
  if (_isViewModelObject(prop)) {
    return compareFn(prop.$$vmObjType & filter);
  }
  return false;
}

function createProxy<
  I extends ViewModelObject,
  E extends ViewModelObject | void,
  VM extends ViewModel
>(
  viewModel: VM,
  include: number,
  exclude: number,
  getFn: (this: VM, prop: I, name: string) => any,
  setFn?: (this: VM, prop: I, name: string, value: any) => void
) {
  const proxy = {};
  Object.keys(viewModel).forEach((name) => {
    const prop = (viewModel as any)[name];
    if (
      testObjType<I>(prop, include, (n) => n === include) &&
      (!exclude || !testObjType<E>(prop, exclude, (n) => !!n))
    ) {
      Object.defineProperty(proxy, name, {
        get: getFn.bind(viewModel, prop, name),
        set: setFn ? setFn.bind(viewModel, prop, name) : undefined,
        enumerable: true,
        configurable: true,
      });
    }
  });
  return proxy as ViewModelProxy<VM, any, I, E>;
}

function getBuiltinProxy<VM extends ViewModel>(
  viewModel: VM,
  filter: BuiltinProxyFilter
) {
  let include: number = 0x00;
  let getFn: (this: VM, prop: any, name: string) => any;
  let setFn:
    | ((this: VM, prop: any, name: string, value: any) => void)
    | undefined;
  switch (filter) {
    case 'ref':
      include = 0x80;
      getFn = (prop: Ref<unknown>) => prop.ref.current;
      setFn = (prop: Ref<unknown>, _: string, value: unknown) => {
        prop.ref.current = value;
      };
      break;
    case 'state':
      include = 0x06;
      setFn = (prop: Observable<unknown>, _: string, value: unknown) => {
        prop.value = value;
      };
    // falls through
    case 'value':
      if (!include) {
        include = 0x02;
      }
      getFn = (prop: Observable<unknown>) => prop.value;
      break;
    case 'result':
      include = 0x08;
      getFn = (prop: Result<unknown>) =>
        prop.$$vmObjType & 0x10 &&
        !((prop as unknown) as Validatable<unknown>).validator.enabled
          ? undefined
          : prop.result;
      break;
    case 'error':
      include = 0x10;
      getFn = (prop: Validatable<any, any>) => prop.hasError.value;
      setFn = (prop: Validatable<any, any>, _: string, value: boolean) => {
        prop.hasError.value = value;
      };
      break;
    case 'message':
      include = 0x10;
      getFn = (prop: Validatable<any, any>) => prop.errorMessage.value;
      setFn = (prop: Validatable<any, any>, _: string, value: string) => {
        prop.errorMessage.value = value;
      };
      break;
    default:
      throw new Error(`Unsupported proxy name '${filter}'`);
  }
  return createProxy(viewModel, include, 0x00, getFn, setFn);
}

function parseFilter(filter: ProxyFilter) {
  let include = 0;
  let exclude = 0;
  function applyOption(bias: number, opt?: boolean) {
    if (typeof opt === 'boolean') {
      if (opt) {
        include |= bias;
      } else {
        exclude |= bias;
      }
    }
  }
  applyOption(0x02, filter.value);
  applyOption(0x04, filter.observable);
  applyOption(0x08, filter.result);
  applyOption(0x10, filter.validatable);
  applyOption(0x40, filter.async);
  applyOption(0x80, filter.ref);
  return [include, exclude];
}

export function _proxy() {
  // eslint-disable-next-line prefer-rest-params
  const args = arguments;
  const [viewModel] = args;
  if (typeof args[1] === 'function') {
    const [, getFn, setFn] = args;
    return createProxy(viewModel, 0x00, 0x00, getFn, setFn);
  }
  const [, filter, getFn, setFn] = args;
  if (typeof filter === 'string') {
    return getBuiltinProxy(viewModel, filter as BuiltinProxyFilter);
  }
  const [include, exclude] = parseFilter(filter);
  return createProxy(viewModel, include, exclude, getFn, setFn);
}
