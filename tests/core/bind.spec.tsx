import '@testing-library/jest-dom';

import React from 'react';
import { act } from 'react-dom/test-utils';
import { Bind, computed, observable, useBind } from '@jishida/react-mvvm';
import { render } from '@testing-library/react';

test(`Bind component - bind Observable to HTML tag`, () => {
  const initialValue = 'initial value';
  const text = observable(initialValue);
  const { container } = render(<Bind $type='p'>{text}</Bind>);
  const p = container.children[0];

  expect(p.nodeName).toBe('P');
  expect(p).toHaveTextContent(initialValue);

  const modifiedValue = 'modified value';
  act(() => {
    text.value = modifiedValue;
  });
  expect(p).toHaveTextContent(modifiedValue);
});

test(`Bind component - bind Observable to function component`, () => {
  function Text({ text }: { text: string }) {
    return <p>{text}</p>;
  }
  const initialValue = 'initial value';
  const text = observable(initialValue);
  const { container } = render(<Bind $type={Text} text={text} />);
  const p = container.children[0];

  expect(p.nodeName).toBe('P');
  expect(p).toHaveTextContent(initialValue);

  const modifiedValue = 'modified value';
  act(() => {
    text.value = modifiedValue;
  });
  expect(p).toHaveTextContent(modifiedValue);
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
  const { container } = render(<Bind $type={Text} text={text} />);
  const p = container.children[0];

  expect(p.nodeName).toBe('P');
  expect(p).toHaveTextContent(initialValue);

  const modifiedValue = 'modified value';
  act(() => {
    text.value = modifiedValue;
  });
  expect(p).toHaveTextContent(modifiedValue);
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
  const { container } = render(<Component />);
  const ul = container.children[0];

  expect(ul.nodeName).toBe('UL');
  expect(ul.children.length).toBe(1);
  expect(ul.children[0].nodeName).toBe('LI');
  expect(ul.children[0]).toHaveTextContent('uno');

  items.value[0].text = 'one';
  items.value.push({ key: 2, text: 'two' }, { key: 3, text: 'three' });
  act(() => {
    items.notify();
  });
  expect(ul.children.length).toBe(3);
  expect(ul.children[0]).toHaveTextContent('one');
  expect(ul.children[1]).toHaveTextContent('two');
  expect(ul.children[2]).toHaveTextContent('three');
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
  const { container } = render(<Component />);
  const dl = container.children[0];

  expect(dl.nodeName).toBe('DL');
  expect(dl).not.toHaveAttribute('hidden');
  expect(dl.children.length).toBe(2);
  expect(dl.children[0].nodeName).toBe('DT');
  expect(dl.children[0]).toHaveTextContent(initialTerm);
  expect(dl.children[1].nodeName).toBe('DD');
  expect(dl.children[1]).toHaveTextContent(initialDescription);

  const modifiedTerm = 'term 2';
  const modifiedDescription = 'description 2';
  act(() => {
    hidden.value = true;
    term.value = modifiedTerm;
    description.value = modifiedDescription;
  });
  expect(dl).toHaveAttribute('hidden');
  expect(dl.children[0]).toHaveTextContent(modifiedTerm);
  expect(dl.children[1]).toHaveTextContent(modifiedDescription);
});

test(`Bind component - ref forwarded`, () => {
  const initialValue = 'initial value';
  const text = observable<string, HTMLInputElement>(initialValue, {
    ref: true,
  });
  const { container } = render(
    <Bind $type='input' ref={text.ref} defaultValue={text} />
  );
  const input = container.children[0];

  expect(input).toBe(text.ref.current);
  expect(input.nodeName).toBe('INPUT');
  expect(input).toHaveValue(initialValue);
});

test(`Bind component - pass the same Observable object twice to a Bind component`, () => {
  const className = observable('class-name');
  const { container } = render(
    <Bind $type='p' className={className}>
      {className}
    </Bind>
  );
  const p = container.children[0];
  expect(p.nodeName).toBe('P');
  expect(p).toHaveClass('class-name');
  expect(p).toHaveTextContent('class-name');
});

test(`Bind component - no dependencies`, () => {
  const { container } = render(<Bind $type='p'>test</Bind>);
  const p = container.children[0];
  expect(p.nodeName).toBe('P');
  expect(p).toHaveTextContent('test');
});

test(`useBind function - same deps`, () => {
  const a = observable('a');
  const b = observable('b');
  const ab = computed((aValue, bValue) => `${aValue}+${bValue}`, [a, b]);

  const Component = () => {
    const [aValue, bValue, abValue] = useBind(a, b, ab);
    return (
      <ul>
        <li>{aValue}</li>
        <li>{bValue}</li>
        <li>{abValue}</li>
      </ul>
    );
  };

  const { container } = render(<Component />);
  const ul = container.children[0];

  expect(ul.nodeName).toBe('UL');
  expect(ul.children.length).toBe(3);
  expect(ul.children[0].nodeName).toBe('LI');
  expect(ul.children[0]).toHaveTextContent('a');
  expect(ul.children[1].nodeName).toBe('LI');
  expect(ul.children[1]).toHaveTextContent('b');
  expect(ul.children[2].nodeName).toBe('LI');
  expect(ul.children[2]).toHaveTextContent('a+b');

  act(() => {
    a.value = 'alpha';
  });

  expect(ul.children.length).toBe(3);
  expect(ul.children[0]).toHaveTextContent('alpha');
  expect(ul.children[1]).toHaveTextContent('b');
  expect(ul.children[2]).toHaveTextContent('alpha+b');

  act(() => {
    b.value = 'bravo';
  });

  expect(ul.children.length).toBe(3);
  expect(ul.children[0]).toHaveTextContent('alpha');
  expect(ul.children[1]).toHaveTextContent('bravo');
  expect(ul.children[2]).toHaveTextContent('alpha+bravo');
});
