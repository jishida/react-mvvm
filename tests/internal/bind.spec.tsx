import React from 'react';
import { mount } from 'enzyme';
import { Bind, observable } from '../../src';
import { _DependencyValue } from '../../src/core/objects';
import { ILLEGAL_OBSERVABLE_INSTANCE } from '../utils/constants';

test(`Bind component - invalid prototype Observable`, () => {
  const text = observable('initial value');
  Object.setPrototypeOf(text, _DependencyValue.prototype);
  (text as any).deps = [text];
  jest.spyOn(console, 'error').mockImplementation(() => {});
  expect(() => {
    mount(<Bind $type='p'>{text}</Bind>);
  }).toThrowError(ILLEGAL_OBSERVABLE_INSTANCE);
});
