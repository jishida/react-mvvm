import React from 'react';
import { act } from 'react-dom/test-utils';
import { Bind, computed, observable, useBind } from '@jishida/react-mvvm';
import { mount } from 'enzyme';

test(`Bind component - bind Observable to HTML tag`, () => {
  const initialValue = 'initial value';
  const text = observable(initialValue);
  const wrapper = mount(<Bind $type='p'>{text}</Bind>);
  expect(wrapper.find('p').text()).toBe(initialValue);

  const modifiedValue = 'modified value';
  act(() => {
    text.value = modifiedValue;
  });
  expect(wrapper.find('p').text()).toBe(modifiedValue);
});

test(`Bind component - bind Observable to function component`, () => {
  function Text({ text }: { text: string }) {
    return <p>{text}</p>;
  }
  const initialValue = 'initial value';
  const text = observable(initialValue);
  const wrapper = mount(<Bind $type={Text} text={text} />);
  expect(wrapper.find('p').text()).toBe(initialValue);

  const modifiedValue = 'modified value';
  act(() => {
    text.value = modifiedValue;
  });
  expect(wrapper.find('p').text()).toBe(modifiedValue);
});

test(`Bind component - bind Observable to class based component`, () => {
  class Text extends React.Component<{ text: string }> {
    render() {
      const {
        props: { text },
      } = this;
      return <p>{text}</p>;
    }
  }
  const initialValue = 'initial value';
  const text = observable(initialValue);
  const wrapper = mount(<Bind $type={Text} text={text} />);
  expect(wrapper.find('p').text()).toBe(initialValue);

  const modifiedValue = 'modified value';
  act(() => {
    text.value = modifiedValue;
  });
  expect(wrapper.find('p').text()).toBe(modifiedValue);
});

test(`Bind component - observable array`, () => {
  interface Item {
    key: number;
    text: string;
  }
  const items = observable<Item[]>([{ key: 1, text: 'uno' }]);
  const Component = () => (
    <Bind $type='ul'>
      {items.to((value) =>
        value.map((item) => <li key={item.key}>{item.text}</li>)
      )}
    </Bind>
  );
  const wrapper = mount(<Component />);

  expect(wrapper.find('li').length).toBe(1);
  expect(wrapper.find('li').at(0).text()).toBe('uno');

  items.value[0].text = 'one';
  items.value.push({ key: 2, text: 'two' }, { key: 3, text: 'three' });
  act(() => {
    items.notify();
  });
  wrapper.update();
  expect(wrapper.find('li').length).toBe(3);
  expect(wrapper.find('li').at(0).text()).toBe('one');
  expect(wrapper.find('li').at(1).text()).toBe('two');
  expect(wrapper.find('li').at(2).text()).toBe('three');
});

test(`Bind component - observable array item`, () => {
  const initialTerm = 'term 1';
  const initialDescription = 'description 1';
  const hidden = observable(false);
  const term = observable(initialTerm);
  const description = observable(initialDescription);
  const Component = () => (
    <Bind $type='dl' hidden={hidden}>
      <Bind $type='dt'>{term}</Bind>
      {description.to((v) => (
        <dd key={1}>{v}</dd>
      ))}
    </Bind>
  );
  const wrapper = mount(<Component />);

  expect(wrapper.find('dl').getDOMNode<HTMLDListElement>().hidden).toBe(false);
  expect(wrapper.find('dt').text()).toBe(initialTerm);
  expect(wrapper.find('dd').text()).toBe(initialDescription);

  const modifiedTerm = 'term 2';
  const modifiedDescription = 'description 2';
  act(() => {
    hidden.value = true;
    term.value = modifiedTerm;
    description.value = modifiedDescription;
  });
  expect(wrapper.find('dl').getDOMNode<HTMLDListElement>().hidden).toBe(true);
  expect(wrapper.find('dt').text()).toBe(modifiedTerm);
  expect(wrapper.find('dd').text()).toBe(modifiedDescription);
});

test(`Bind component - ref forwarded`, () => {
  const initialValue = 'initial value';
  const text = observable<string, HTMLInputElement>(initialValue, {
    ref: true,
  });
  const wrapper = mount(
    <Bind $type='input' ref={text.ref} defaultValue={text} />
  );
  expect(wrapper.find('input').getDOMNode<HTMLInputElement>()).toBe(
    text.ref.current
  );
  expect(wrapper.find('input').getDOMNode<HTMLInputElement>().value).toBe(
    initialValue
  );
});

test(`Bind component - pass the same Observable object twice to a Bind component`, () => {
  const className = observable('class-name');
  const wrapper = mount(
    <Bind $type='p' className={className}>
      {className}
    </Bind>
  );
  expect(wrapper.find('p').text()).toBe('class-name');
  expect(wrapper.find('p').getDOMNode().className).toBe('class-name');
});

test(`useBind function - same deps`, () => {
  const a = observable('a');
  const b = observable('b');
  const ab = computed((a, b) => `${a}+${b}`, [a, b]);

  const Component = () => {
    useBind(a, b, ab);
    return (
      <ul>
        <li>{a.value}</li>
        <li>{b.value}</li>
        <li>{ab.value}</li>
      </ul>
    );
  };

  const wrapper = mount(<Component />);
  expect(wrapper.find('li').length).toBe(3);
  expect(wrapper.find('li').at(0).text()).toBe('a');
  expect(wrapper.find('li').at(1).text()).toBe('b');
  expect(wrapper.find('li').at(2).text()).toBe('a+b');

  act(() => {
    a.value = 'alpha';
  });

  expect(wrapper.find('li').length).toBe(3);
  expect(wrapper.find('li').at(0).text()).toBe('alpha');
  expect(wrapper.find('li').at(1).text()).toBe('b');
  expect(wrapper.find('li').at(2).text()).toBe('alpha+b');

  act(() => {
    b.value = 'bravo';
  });

  expect(wrapper.find('li').length).toBe(3);
  expect(wrapper.find('li').at(0).text()).toBe('alpha');
  expect(wrapper.find('li').at(1).text()).toBe('bravo');
  expect(wrapper.find('li').at(2).text()).toBe('alpha+bravo');
});
