import { h } from 'preact';
import { Bind, observable } from '@jishida/react-mvvm';
import { mount } from 'enzyme';
import React from 'react';

test(`preact without preact/compat`, () => {
  const text = observable('initial value');
  const Component = () =>
    h(Bind, {
      $type: 'input',
      value: text,
      onInput: text.bindValue((e: any) => e.target.value),
    } as any);

  const wrapper = mount(h(Component, {}) as any);
  expect(wrapper.find('input').getDOMNode<HTMLInputElement>().value).toBe(
    'initial value'
  );
  wrapper.find('input').getDOMNode<HTMLInputElement>().value = 'modified value';
  wrapper.find('input').simulate('input');
  expect(text.value).toBe('modified value');
});
