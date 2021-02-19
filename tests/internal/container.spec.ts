import { ObjectContainer } from '../../src';
import { _Container } from '../../src/core';

test('The add and remove methods of Container call the add and delete methods of the Set instance', () => {
  const items = new Set<string>();
  const sut = new _Container(items) as ObjectContainer<string>;

  sut.remove('one');
  expect(items.size).toBe(0);
  expect(Array.from(items.values())).toEqual([]);

  sut.add('one');
  expect(items.size).toBe(1);
  expect(Array.from(items.values())).toEqual(['one']);

  sut.add('two');
  expect(items.size).toBe(2);
  expect(Array.from(items.values())).toEqual(['one', 'two']);

  sut.add('three');
  expect(items.size).toBe(3);
  expect(Array.from(items.values())).toEqual(['one', 'two', 'three']);

  sut.add('two');
  expect(items.size).toBe(3);
  expect(Array.from(items.values())).toEqual(['one', 'two', 'three']);

  sut.remove('four');
  expect(items.size).toBe(3);
  expect(Array.from(items.values())).toEqual(['one', 'two', 'three']);

  sut.remove('two');
  expect(items.size).toBe(2);
  expect(Array.from(items.values())).toEqual(['one', 'three']);

  sut.remove('one');
  expect(items.size).toBe(1);
  expect(Array.from(items.values())).toEqual(['three']);
});
