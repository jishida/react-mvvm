import React, { ChangeEvent } from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { Bind } from '@jishida/react-mvvm';
import {
  getObservableOptionsCases,
  ObservableObjectFactory,
} from '../utils/options';

test.each(getObservableOptionsCases())(
  `Observable (%s) - bindValue method`,
  (_: string, options: any, factory: ObservableObjectFactory<string>) => {
    const initialValue = 'initial value';
    const modifiedValue = 'modified value';
    const sut = factory(initialValue, options);
    const Component = () => (
      <Bind
        $type='input'
        value={sut}
        onChange={sut.bindValue(
          (e: ChangeEvent<HTMLInputElement>) => e.target.value
        )}
      />
    );
    const wrapper = mount(<Component />);
    const input = wrapper.find('input');
    input.getDOMNode<HTMLInputElement>().value = modifiedValue;
    input.simulate('change');
    input.simulate('input');
    expect(sut.value).toBe(modifiedValue);
  }
);

test.each(getObservableOptionsCases())(
  `Observable (%s) - to method`,
  (_: string, options: any, factory: ObservableObjectFactory<string>) => {
    const initialValue = 'initial value';
    const sut = factory(initialValue, options);
    const Component = () => <Bind $type='p'>{sut.to((s) => `[${s}]`)}</Bind>;

    const wrapper = mount(<Component />);
    const p = wrapper.find('p');
    expect(p.text()).toBe('[initial value]');

    const modifiedValue = 'modified value';
    act(() => {
      sut.value = modifiedValue;
    });
    expect(p.text()).toBe('[modified value]');
  }
);
