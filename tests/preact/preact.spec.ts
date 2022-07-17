import '@testing-library/jest-dom';

import { h } from 'preact';
import { Bind, observable } from '@jishida/react-mvvm';
import { act } from 'preact/test-utils';
import { render, screen } from '@testing-library/preact';

test(`preact without preact/compat`, () => {
  const text = observable('initial value');
  const Component = () =>
    h(Bind, {
      $type: 'input',
      role: 'target',
      value: text,
      onInput: text.bindValue((e: any) => e.target.value),
    } as any);

  render(h(Component, {}));
  expect(screen.getByRole('target')).toHaveValue('initial value');
  act(() => {
    text.value = 'modified value';
  });
  expect(screen.getByRole('target')).toHaveValue('modified value');
});
