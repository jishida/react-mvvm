import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { observable, Bind } from '@jishida/react-mvvm';
import { _ObservableComputed } from '../../src/experimental';

async function wait(timeout?: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), timeout);
  });
}
test(`ObservableComputed`, async () => {
  const left = observable(0);
  const right = observable(0);
  const sut = new _ObservableComputed({}, (x: number, y: number) => x * y, [
    left,
    right,
  ]);
  const expected = {
    value: 0,
    leftValue: 0,
    rightValue: 0,
    nofifyCount: 0,
    leftNotifyCount: 0,
    rightNotifyCount: 0,
  };
  let notifyCount = 0;
  let leftNotifyCount = 0;
  let rightNotifyCount = 0;
  left.onNotify.add(() => {
    leftNotifyCount += 1;
  });
  right.onNotify.add(() => {
    rightNotifyCount += 1;
  });
  sut.deps[0].onNotify.add(() => {
    notifyCount += 1;
  });

  const wrapper = mount(
    <ul>
      <Bind $type='li'>{left}</Bind>
      <Bind $type='li'>{right}</Bind>
      <Bind $type='li'>{sut}</Bind>
    </ul>
  );

  function testCurrent() {
    expect(sut.value).toBe(expected.value);
    expect(left.value).toBe(expected.leftValue);
    expect(right.value).toBe(expected.rightValue);
    expect(notifyCount).toBe(expected.nofifyCount);
    expect(leftNotifyCount).toBe(expected.leftNotifyCount);
    expect(rightNotifyCount).toBe(expected.rightNotifyCount);
    expect(wrapper.find('li').at(0).text()).toBe(`${expected.leftValue}`);
    expect(wrapper.find('li').at(1).text()).toBe(`${expected.rightValue}`);
    expect(wrapper.find('li').at(2).text()).toBe(`${expected.value}`);
  }

  testCurrent();

  act(() => {
    left.value = 3;
  });
  expected.leftValue = 3;
  expected.leftNotifyCount += 1;
  testCurrent();

  await act(async () => {
    await wait();
  });
  testCurrent();

  act(() => {
    right.value = 2;
  });
  expected.rightValue = 2;
  expected.rightNotifyCount += 1;
  testCurrent();

  await act(async () => {
    await wait();
  });
  expected.value = 6;
  expected.nofifyCount += 1;
  testCurrent();

  act(() => {
    left.value = 5;
  });
  expected.leftValue = 5;
  expected.leftNotifyCount += 1;
  testCurrent();

  await act(async () => {
    await wait();
  });
  expected.value = 10;
  expected.nofifyCount += 1;
  testCurrent();
});
