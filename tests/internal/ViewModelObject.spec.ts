import { _getComputedClass } from '../../src/core';
import { _ViewModelObject } from '../../src/core/objects';
import { _ValidatableOptions } from '../../src/extensions/validators';
import { DependencyValue } from '../../src/interfaces';
import { getClass, ObjectKeys } from '../utils/classes';
import {
  getObservableOptionsCases,
  ObservableObjectFactory,
} from '../utils/options';
import '../utils/setupExtensions';

test.each([
  ['ref', 0x80],
  ['observable', 0x07],
  ['observable:ref', 0x87],
  ['observable:result', 0x0f],
  ['observable:ref:result', 0x8f],
  ['validatable', 0x17],
  ['validatable:ref', 0x97],
  ['validatable:result', 0x1f],
  ['validatable:ref:result', 0x9f],
  ['validatable:async', 0x57],
  ['validatable:ref:async', 0xd7],
  ['validatable:result:async', 0x5f],
  ['validatable:ref:result:async', 0xdf],
  ['parsable', 0x3f],
  ['parsable:ref', 0xbf],
  ['parsable:async', 0x7f],
  ['parsable:ref:async', 0xff],
] as [ObjectKeys, number][])(
  `$$vmObjType check (%s) returns %d`,
  (key: any, spec: number) => {
    const opts: _ValidatableOptions<string, any> = {
      _initialValue: 'initial value',
      _validate: () => {},
    };
    const Class = getClass(key);
    const sut = new Class(opts);
    expect(sut.$$vmObjType).toBe(spec);
  }
);

test.each([
  ['computed:', 0x03, { ref: false, result: false }],
  ['computed:ref', 0x83, { ref: true, result: false }],
  ['computed:result', 0x0b, { ref: false, result: true }],
  ['computed:ref:result', 0x8b, { ref: true, result: true }],
])(
  '$$vmObjType check (%s) returns %d',
  (_: string, spec: number, options: any) => {
    const Class = _getComputedClass<null, [DependencyValue<null>]>(options);
    const sut = new Class(options, () => null, [] as any);
    expect(sut.$$vmObjType).toBe(spec);
  }
);

test.each(getObservableOptionsCases())(
  `instance check (%s)`,
  (keys: any, options: any, factory: ObservableObjectFactory<string>) => {
    const sut = factory('dummy', options);
    const Class = getClass(keys);
    expect(sut).toBeInstanceOf(Class);
  }
);

test(`_ViewModelObject class`, () => {
  const sut = new _ViewModelObject({ _vmObjType: 0xff });
  expect(sut.$$vmObjType).toBe(0xff);
});
