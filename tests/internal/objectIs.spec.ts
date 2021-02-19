/* eslint import/first: off */
const builtinIs = Object.is;
(Object.is as any) = null;

import { _is } from '../../src/core';

(Object.is as any) = builtinIs;

test('objectIs', () => {
  expect(_is).not.toBe(builtinIs);
  expect(_is('hoge', 'hoge')).toBe(true);
  expect(_is(Object, Object)).toBe(true);

  expect(_is('foo', 'bar')).toBe(false);
  expect(_is({}, {})).toBe(false);

  const foo = { a: 1 };
  const bar = { a: 1 };

  expect(_is(foo, foo)).toBe(true);
  expect(_is(foo, bar)).toBe(false);

  expect(_is(null, null)).toBe(true);

  expect(_is(0, -0)).toBe(false);
  expect(_is(0, 0)).toBe(true);
  expect(_is(-0, -0)).toBe(true);
  expect(_is(NaN, 0 / 0)).toBe(true);
});
