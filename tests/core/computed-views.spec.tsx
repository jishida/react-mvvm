import React from 'react';
import { Bind, computed, observable } from '@jishida/react-mvvm';
import { mount } from 'enzyme';

test(`ComputedObject - to method`, () => {
  const three = observable(3);
  const five = observable(5);
  const sut = computed((a, b) => a * b, [three, five]);

  const Component = () => <Bind $type='p'>{sut.to((n) => n * 7)}</Bind>;
  const wrapper = mount(<Component />);
  expect(wrapper.find('p').text()).toBe('105');
});
