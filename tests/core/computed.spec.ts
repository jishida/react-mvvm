import { computed, observable } from '@jishida/react-mvvm';
import { computedOptionsCases } from '../utils/options';

test.each(computedOptionsCases)(
  `computed function (%s)`,
  (_: string, options: any) => {
    const firstName = observable('John');
    const lastName = observable('Doe');
    const sut = computed(
      (first, last) => `${first} ${last}`,
      [firstName, lastName],
      options
    );

    expect(sut.deps).toStrictEqual([firstName, lastName]);
    expect(sut.value).toBe('John Doe');
    if (sut.spec & 0x08) {
      expect(sut.result).toBe('John Doe');
    }
  }
);
