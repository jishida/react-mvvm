import {
  computed,
  isViewModelObject,
  observable,
  ref,
} from '@jishida/react-mvvm';
import {
  getObservableOptionsCases,
  ObservableObjectFactory,
} from '../utils/options';

test.each(getObservableOptionsCases())(
  `Observable (%s) - isViewModelObject returns true`,
  (_: string, options: any, factory: ObservableObjectFactory<any>) => {
    const sut = factory('', options);
    expect(isViewModelObject(sut)).toBe(true);
  }
);

test(`Ref - isViewModelObject returns true`, () => {
  const sut = ref();
  expect(isViewModelObject(sut)).toBe(true);
});

test(`Computed - isViewModelObject returns true`, () => {
  expect(isViewModelObject(computed(() => '', [observable('')]))).toBe(true);
});

test.each([
  ['function', () => {}],
  ['object', {}],
  ['array', []],
  ['number', 0],
  ['string', ''],
  ['boolean', true],
  ['symbol', Symbol('test')],
] as [string, any][])(
  `%s - isViewModelObject returns false`,
  (_: string, value: any) => {
    expect(isViewModelObject(value)).toBe(false);
  }
);
