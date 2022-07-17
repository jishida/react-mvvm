import '@testing-library/jest-dom';

import React from 'react';
import { render, screen } from '@testing-library/react';
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
    render(<input role='target' ref={sut.bindRef()} />);
    expect(sut.ref.current).toBeTruthy();
    expect(sut.ref.current).toBe(screen.getByRole('target'));
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
    render(<input role='target' ref={sut.bindRef()} />);
    expect(sut.ref.current).toBeTruthy();
    expect(sut.ref.current).toBe(screen.getByRole('target'));
  }
);

test.each(
  getObservableOptionsCases().filter((c) => c[0].split(':').includes('ref'))
)(
  `Observable (%s) - ref`,
  (_: string, options: any, factory: ObservableObjectFactory<any>) => {
    const sut = (factory('', options) as unknown) as Ref<HTMLInputElement>;
    expect(sut.ref.current).toBe(null);
    render(<input role='target' ref={sut.ref} />);
    expect(sut.ref.current).toBeTruthy();
    expect(sut.ref.current).toBe(screen.getByRole('target'));
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
    render(<input role='target' ref={sut.ref} />);
    expect(sut.ref.current).toBeTruthy();
    expect(sut.ref.current).toBe(screen.getByRole('target'));
  }
);

test(`ref function`, () => {
  const sut = ref<HTMLInputElement>();
  expect(sut.ref.current).toBe(null);
  render(<input role='target' ref={sut.bindRef()} />);
  expect(sut.ref.current).toBeTruthy();
  expect(sut.ref.current).toBe(screen.getByRole('target'));
});

test(`bindRef with ReactRefObject`, () => {
  const sut = ref<HTMLInputElement>();
  const refObject = React.createRef<HTMLInputElement>();
  expect(sut.ref.current).toBe(null);
  render(<input role='target' ref={sut.bindRef(refObject)} />);
  expect(sut.ref.current).toBeTruthy();
  expect(sut.ref.current).toBe(screen.getByRole('target'));
  expect(refObject.current).toBe(screen.getByRole('target'));
});

test(`bindRef with ReactRefCallback`, () => {
  const sut = ref<HTMLInputElement>();
  const refCallback = jest.fn(() => {});
  expect(sut.ref.current).toBe(null);
  render(<input role='target' ref={sut.bindRef(refCallback)} />);
  expect(sut.ref.current).toBeTruthy();
  expect(sut.ref.current).toBe(screen.getByRole('target'));
  expect(refCallback).toBeCalledTimes(2);
  expect(refCallback.mock.calls[0]).toEqual([null]);
  expect(refCallback.mock.calls[1]).toEqual([screen.getByRole('target')]);
});
