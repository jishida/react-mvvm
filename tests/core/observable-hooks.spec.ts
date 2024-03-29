import React, { EffectCallback } from 'react';
import { Computed, ObservableOptions, useBind } from '@jishida/react-mvvm';
import {
  getObservableOptionsCases,
  ObservableObjectFactory,
} from '../utils/options';

const mockHooks = {
  useMemo: (React.useMemo = jest.fn(React.useMemo)),
  useState: (React.useState = jest.fn(React.useState)),
  useEffect: (React.useEffect = jest.fn(React.useEffect)),
};

afterEach(() => {
  mockHooks.useMemo.mockReset();
  mockHooks.useState.mockReset();
  mockHooks.useEffect.mockReset();
});

class UseEffectMock {
  private _unmount?: () => void;

  constructor(private readonly _mount: EffectCallback) {}

  mount() {
    this._unmount = this._mount() as () => void;
  }

  unmount() {
    this._unmount!();
  }
}

test.each(getObservableOptionsCases())(
  `useBind function (%s)`,
  (
    _: string,
    options: ObservableOptions,
    factory: ObservableObjectFactory<string>
  ) => {
    const initialValue = 'value1';
    const sut = factory(initialValue, options);

    const expected = {
      useMemoCalledTimes: 0,
      useEffectCalledTimes: 0,
      useStateCalledTimes: 0,
      setterCalls: [] as any[][][],
    };

    const effectMocks: UseEffectMock[] = [];
    const setters: ((value: any) => void)[] = [];

    function testCurrent() {
      expect(mockHooks.useEffect).toBeCalledTimes(
        expected.useEffectCalledTimes
      );
      expect(mockHooks.useState).toBeCalledTimes(expected.useStateCalledTimes);
      expect(effectMocks.length).toBe(expected.useEffectCalledTimes);
      expect((mockHooks.useState as any).mock.calls.length).toBe(
        setters.length
      );
      setters.forEach((setter: any, i) => {
        expect(setter.mock.calls).toEqual(expected.setterCalls[i]);
      });
    }

    mockHooks.useMemo.mockImplementation((f: () => any) => f());
    mockHooks.useEffect.mockImplementation((onMount: any) =>
      effectMocks.push(new UseEffectMock(onMount))
    );
    mockHooks.useState.mockImplementation(() => {
      const setter = jest.fn(() => {});
      setters.push(setter);
      return [undefined, setter];
    });

    testCurrent();

    useBind(sut);

    expected.useMemoCalledTimes += 1;
    expected.useEffectCalledTimes += 1;
    expected.useStateCalledTimes += 1;
    expected.setterCalls.push([]);
    testCurrent();

    sut.value = 'value2';
    testCurrent();

    effectMocks[0].mount();
    sut.value = 'value3';
    expected.setterCalls[0].push([{}]);
    testCurrent();

    useBind(sut);

    expected.useMemoCalledTimes += 1;
    expected.useEffectCalledTimes += 1;
    expected.useStateCalledTimes += 1;
    expected.setterCalls.push([]);
    testCurrent();

    effectMocks[1].mount();
    sut.value = 'value4';
    expected.setterCalls[0].push([{}]);
    expected.setterCalls[1].push([{}]);
    testCurrent();

    effectMocks[0].unmount();
    sut.value = 'value5';
    expected.setterCalls[1].push([{}]);
    testCurrent();

    effectMocks[1].unmount();
    sut.value = 'value6';
    testCurrent();
  }
);

test.each(getObservableOptionsCases())(
  `Observable (%s) - to method`,
  (
    _: string,
    options: ObservableOptions,
    factory: ObservableObjectFactory<string>
  ) => {
    const initialValue = '0xff';
    const obj = factory(initialValue, options);

    const useMemoDeps: any[] = [];
    let memo: Computed<number> | null = null;
    mockHooks.useMemo.mockImplementation(
      (f: () => any, deps?: ReadonlyArray<any>) => {
        expect(deps).toBe(useMemoDeps);
        if (!memo) {
          memo = f();
        }
        return memo as any;
      }
    );
    const sut = obj.to((s) => Number.parseInt(s, 16), useMemoDeps);
    expect(sut.value).toBe(0xff);
    expect(sut.deps).toStrictEqual([obj]);
    expect(sut).toBe(memo);
  }
);
