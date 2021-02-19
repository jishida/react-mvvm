import React, { createRef } from 'react';
import { mount } from 'enzyme';
import { Ref, ref, computed, observable } from '@jishida/react-mvvm';
import {
  computedOptionsCases,
  getObservableOptionsCases,
  ObservableObjectFactory,
} from '../utils/options';

test.each(
  getObservableOptionsCases().filter((c) => c[0].split(':').includes('ref'))
)(
  `Observable (%s) - bindRef`,
  (_: string, options: any, factory: ObservableObjectFactory<any>) => {
    const sut = (factory('', options) as unknown) as Ref<HTMLInputElement>;
    expect(sut.ref.current).toBe(null);
    const wrapper = mount(<input ref={sut.bindRef()} />);
    expect(sut.ref.current).toBeTruthy();
    expect(sut.ref.current).toBe(wrapper.getDOMNode());
  }
);

test.each(computedOptionsCases.filter((c) => c[0].split(':').includes('ref')))(
  `Computed (%s) - bindRef`,
  (_: string, options: any) => {
    const obj = observable('');
    const sut = (computed(
      () => null,
      [obj],
      options
    ) as unknown) as Ref<HTMLInputElement>;
    expect(sut.ref.current).toBe(null);
    const wrapper = mount(<input ref={sut.bindRef()} />);
    expect(sut.ref.current).toBeTruthy();
    expect(sut.ref.current).toBe(wrapper.getDOMNode());
  }
);

test.each(
  getObservableOptionsCases().filter((c) => c[0].split(':').includes('ref'))
)(
  `Observable (%s) - ref`,
  (_: string, options: any, factory: ObservableObjectFactory<any>) => {
    const sut = (factory('', options) as unknown) as Ref<HTMLInputElement>;
    expect(sut.ref.current).toBe(null);
    const wrapper = mount(<input ref={sut.ref} />);
    expect(sut.ref.current).toBeTruthy();
    expect(sut.ref.current).toBe(wrapper.getDOMNode());
  }
);

test.each(computedOptionsCases.filter((c) => c[0].split(':').includes('ref')))(
  `Computed (%s) - ref`,
  (_: string, options: any) => {
    const obj = observable('');
    const sut = (computed(
      () => null,
      [obj],
      options
    ) as unknown) as Ref<HTMLInputElement>;
    expect(sut.ref.current).toBe(null);
    const wrapper = mount(<input ref={sut.ref} />);
    expect(sut.ref.current).toBeTruthy();
    expect(sut.ref.current).toBe(wrapper.getDOMNode());
  }
);

test(`ref function`, () => {
  const sut = ref<HTMLInputElement>();
  expect(sut.ref.current).toBe(null);
  const wrapper = mount(<input ref={sut.bindRef()} />);
  expect(sut.ref.current).toBeTruthy();
  expect(sut.ref.current).toBe(wrapper.getDOMNode());
});

test(`bindRef with ReactRefObject`, () => {
  const sut = ref<HTMLInputElement>();
  const refObject = createRef<HTMLInputElement>();
  expect(sut.ref.current).toBe(null);
  const wrapper = mount(<input ref={sut.bindRef(refObject)} />);
  expect(sut.ref.current).toBeTruthy();
  expect(sut.ref.current).toBe(wrapper.getDOMNode());
  expect(refObject.current).toBe(wrapper.getDOMNode());
});

test(`bindRef with ReactRefCallback`, () => {
  const sut = ref<HTMLInputElement>();
  const refCallback = jest.fn(() => {});
  expect(sut.ref.current).toBe(null);
  const wrapper = mount(<input ref={sut.bindRef(refCallback)} />);
  expect(sut.ref.current).toBeTruthy();
  expect(sut.ref.current).toBe(wrapper.getDOMNode());
  expect(refCallback).toBeCalledTimes(2);
  expect(refCallback.mock.calls[0]).toEqual([null]);
  expect(refCallback.mock.calls[1]).toEqual([wrapper.getDOMNode()]);
});
