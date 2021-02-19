import { ObservableOptions, Result } from '@jishida/react-mvvm';
import {
  getObservableOptionsCases,
  ObservableObjectFactory,
} from '../utils/options';

test.each(getObservableOptionsCases())(
  `Observable (%s) - value property`,
  (
    _: string,
    options: ObservableOptions,
    factory: ObservableObjectFactory<string>
  ) => {
    const initialValue = 'initial value';
    const modifiedValue = 'modified value';
    const sut = factory(initialValue, options);
    expect(sut.value).toBe(initialValue);
    sut.value = modifiedValue;
    expect(sut.value).toBe(modifiedValue);
  }
);

test.each(getObservableOptionsCases())(
  `Observable (%s) - onNotify property`,
  (
    _: string,
    options: ObservableOptions,
    factory: ObservableObjectFactory<string>
  ) => {
    const initialValue = 'initial value';
    const modifiedValue = 'modified value';
    const sut = factory(initialValue, options);
    const onNotifyMock = jest.fn(() => {});
    const expected = {
      calledTimes: 0,
      calls: [] as any[][],
    };

    sut.onNotify.add(onNotifyMock);
    sut.value = initialValue;
    expect(onNotifyMock).toBeCalledTimes(expected.calledTimes);
    expect(onNotifyMock.mock.calls).toEqual(expected.calls);

    sut.value = modifiedValue;
    expected.calledTimes += 1;
    expected.calls.push([sut]);
    expect(onNotifyMock).toBeCalledTimes(expected.calledTimes);
    expect(onNotifyMock.mock.calls).toEqual(expected.calls);
  }
);

test.each(getObservableOptionsCases())(
  `Observable (%s) - compute method`,
  (
    _: string,
    options: ObservableOptions,
    factory: ObservableObjectFactory<number>
  ) => {
    const obj = factory(2, options);
    const sut = obj.compute((n) => n * 100);
    expect(sut.value).toBe(200);
    expect(sut.deps).toStrictEqual([obj]);
  }
);

test.each(
  getObservableOptionsCases().filter(
    (c) => c[0].startsWith('observable') && c[1].result
  )
)(
  `Observable & Result (%s) - result property`,
  (
    _: string,
    options: ObservableOptions,
    factory: ObservableObjectFactory<number>
  ) => {
    const sut = (factory(10, options) as unknown) as Result<number>;
    expect(sut.result).toBe(10);
  }
);
