import '@testing-library/jest-dom';

import React from 'react';
import { Bind, computed, observable } from '@jishida/react-mvvm';
import { render, screen } from '@testing-library/react';

test(`ComputedObject - to method`, () => {
  const three = observable(3);
  const five = observable(5);
  const sut = computed((a, b) => a * b, [three, five]);

  const Component = () => <Bind $type='p'>{sut.to((n) => n * 7)}</Bind>;
  render(<Component />);
  expect(screen.getByText('105')).toBeInTheDocument();
});
