import '@testing-library/jest-dom';

import React, { ChangeEvent } from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent } from '@testing-library/react';
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
        role='target'
        value={sut}
        onChange={sut.bindValue(
          (e: ChangeEvent<HTMLInputElement>) => e.target.value
        )}
      />
    );
    render(<Component />);
    fireEvent.change(screen.getByRole('target'), {
      target: { value: modifiedValue },
    });
    fireEvent.input(screen.getByRole('target'), {
      target: { value: modifiedValue },
    });
    expect(sut.value).toBe(modifiedValue);
  }
);

test.each(getObservableOptionsCases())(
  `Observable (%s) - to method`,
  (_: string, options: any, factory: ObservableObjectFactory<string>) => {
    const initialValue = 'initial value';
    const sut = factory(initialValue, options);
    const Component = () => (
      <Bind role='target' $type='p'>
        {sut.to((s) => `[${s}]`)}
      </Bind>
    );

    render(<Component />);

    expect(screen.getByRole('target')).toHaveTextContent('[initial value]');

    const modifiedValue = 'modified value';
    act(() => {
      sut.value = modifiedValue;
    });
    expect(screen.getByRole('target')).toHaveTextContent('[modified value]');
  }
);
