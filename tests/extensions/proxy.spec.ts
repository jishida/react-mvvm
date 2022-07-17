import {
  computed,
  DependencyValue,
  Observable,
  observable,
  parsable,
  proxy,
  Ref,
  ref,
  resolveObject,
  Result,
  Validatable,
  validatable,
} from '@jishida/react-mvvm';
import { UNSUPPORTED_PROXY_NAME } from '../utils/constants';

const validateFn = () => {};
const validateFnAsync = async () => {};
const parseFn = (value: string) => `${value}_parsed`;
const parseFnAsync = async (value: string) => `${value}_parsed_async`;

class ProxyViewModel {
  _ref = ref<string>();

  _observable = observable('observable', { result: false });
  _observable_ref = observable<string, string>('observable:ref', {
    ref: true,
    result: false,
  });
  _observable_result = observable('observable:result');
  _observable_ref_result = observable<string, string>('observable:ref:result', {
    ref: true,
  });

  _validatable = validatable('validatable', validateFn, { result: false });
  _validatable_ref = validatable<string, string>(
    'validatable:ref',
    validateFn,
    {
      ref: true,
      result: false,
    }
  );
  _validatable_result = validatable('validatable:result', validateFn);
  _validatable_ref_result = validatable<string, string>(
    'validatable:ref:result',
    validateFn,
    {
      ref: true,
    }
  );

  _validatable_async = validatable('validatable:async', validateFnAsync, {
    result: false,
    async: true,
  });
  _validatable_ref_async = validatable<string, string>(
    'validatable:ref:async',
    validateFnAsync,
    {
      ref: true,
      result: false,
      async: true,
    }
  );
  _validatable_result_async = validatable(
    'validatable:result:async',
    validateFnAsync,
    {
      async: true,
    }
  );
  _validatable_ref_result_async = validatable<string, string>(
    'validatable:ref:result:async',
    validateFnAsync,
    {
      ref: true,
      async: true,
    }
  );

  _parsable = parsable('parsable' as string, parseFn);
  _parsable_ref = parsable<string, string, string>(
    'parsable:ref' as string,
    parseFn,
    {
      ref: true,
    }
  );

  _parsable_async = parsable('parsable:async' as string, parseFnAsync, {
    async: true,
  });
  _parsable_ref_async = parsable<string, string, string>(
    'parsable:ref:async' as string,
    parseFnAsync,
    {
      ref: true,
      async: true,
    }
  );

  _computed = computed(() => 'computed', [this._observable], {
    result: false,
  });
  _computed_ref = computed<string, [DependencyValue<string>], string>(
    () => 'computed:ref',
    [this._observable],
    {
      ref: true,
      result: false,
    }
  );
  _computed_result = computed(() => 'computed:result', [this._observable]);
  _computed_ref_result = computed<string, [DependencyValue<string>], string>(
    () => 'computed:ref:result',
    [this._observable],
    {
      ref: true,
    }
  );

  normal_prop = 'proxy ignore this';

  constructor() {
    this._ref.bindRef()('ref_ref');
    this._observable_ref.bindRef()('observable:ref_ref');
    this._observable_ref_result.bindRef()('observable:ref:result_ref');
    this._validatable_ref.bindRef()('validatable:ref_ref');
    this._validatable_ref_result.bindRef()('validatable:ref:result_ref');
    this._validatable_ref_async.bindRef()('validatable:ref:async_ref');
    this._validatable_ref_result_async.bindRef()(
      'validatable:ref:result:async_ref'
    );
    this._parsable_ref.bindRef()('parsable:ref_ref');
    this._parsable_ref_async.bindRef()('parsable:ref:async_ref');
    this._computed_ref.bindRef()('computed:ref_ref');
    this._computed_ref_result.bindRef()('computed:ref:result_ref');
  }
}

test(`proxy - 'ref'`, () => {
  const store = new ProxyViewModel();
  const sut = proxy(store, 'ref');
  expect(sut).toStrictEqual({
    _ref: 'ref_ref',
    _observable_ref: 'observable:ref_ref',
    _observable_ref_result: 'observable:ref:result_ref',
    _validatable_ref: 'validatable:ref_ref',
    _validatable_ref_result: 'validatable:ref:result_ref',
    _validatable_ref_async: 'validatable:ref:async_ref',
    _validatable_ref_result_async: 'validatable:ref:result:async_ref',
    _parsable_ref: 'parsable:ref_ref',
    _parsable_ref_async: 'parsable:ref:async_ref',
    _computed_ref: 'computed:ref_ref',
    _computed_ref_result: 'computed:ref:result_ref',
  });

  const modified = '_modified';
  sut._ref = `${sut._ref}${modified}`;
  sut._observable_ref = `${sut._observable_ref}${modified}`;
  sut._observable_ref_result = `${sut._observable_ref_result}${modified}`;
  sut._validatable_ref = `${sut._validatable_ref}${modified}`;
  sut._validatable_ref_result = `${sut._validatable_ref_result}${modified}`;
  sut._validatable_ref_async = `${sut._validatable_ref_async}${modified}`;
  sut._validatable_ref_result_async = `${sut._validatable_ref_result_async}${modified}`;
  sut._parsable_ref = `${sut._parsable_ref}${modified}`;
  sut._parsable_ref_async = `${sut._parsable_ref_async}${modified}`;
  sut._computed_ref = `${sut._computed_ref}${modified}`;
  sut._computed_ref_result = `${sut._computed_ref_result}${modified}`;

  expect(sut).toStrictEqual({
    _ref: 'ref_ref_modified',
    _observable_ref: 'observable:ref_ref_modified',
    _observable_ref_result: 'observable:ref:result_ref_modified',
    _validatable_ref: 'validatable:ref_ref_modified',
    _validatable_ref_result: 'validatable:ref:result_ref_modified',
    _validatable_ref_async: 'validatable:ref:async_ref_modified',
    _validatable_ref_result_async: 'validatable:ref:result:async_ref_modified',
    _parsable_ref: 'parsable:ref_ref_modified',
    _parsable_ref_async: 'parsable:ref:async_ref_modified',
    _computed_ref: 'computed:ref_ref_modified',
    _computed_ref_result: 'computed:ref:result_ref_modified',
  });
});

test(`proxy - 'value'`, () => {
  const store = new ProxyViewModel();
  const sut = proxy(store, 'value');
  expect(sut).toStrictEqual({
    _observable: 'observable',
    _observable_ref: 'observable:ref',
    _observable_result: 'observable:result',
    _observable_ref_result: 'observable:ref:result',
    _validatable: 'validatable',
    _validatable_ref: 'validatable:ref',
    _validatable_result: 'validatable:result',
    _validatable_ref_result: 'validatable:ref:result',
    _validatable_async: 'validatable:async',
    _validatable_ref_async: 'validatable:ref:async',
    _validatable_result_async: 'validatable:result:async',
    _validatable_ref_result_async: 'validatable:ref:result:async',
    _parsable: 'parsable',
    _parsable_ref: 'parsable:ref',
    _parsable_async: 'parsable:async',
    _parsable_ref_async: 'parsable:ref:async',
    _computed: 'computed',
    _computed_ref: 'computed:ref',
    _computed_result: 'computed:result',
    _computed_ref_result: 'computed:ref:result',
  });
});

test(`proxy - 'state'`, () => {
  const store = new ProxyViewModel();
  const sut = proxy(store, 'state');
  expect(sut).toStrictEqual({
    _observable: 'observable',
    _observable_ref: 'observable:ref',
    _observable_result: 'observable:result',
    _observable_ref_result: 'observable:ref:result',
    _validatable: 'validatable',
    _validatable_ref: 'validatable:ref',
    _validatable_result: 'validatable:result',
    _validatable_ref_result: 'validatable:ref:result',
    _validatable_async: 'validatable:async',
    _validatable_ref_async: 'validatable:ref:async',
    _validatable_result_async: 'validatable:result:async',
    _validatable_ref_result_async: 'validatable:ref:result:async',
    _parsable: 'parsable',
    _parsable_ref: 'parsable:ref',
    _parsable_async: 'parsable:async',
    _parsable_ref_async: 'parsable:ref:async',
  });

  const modified = '_modified';
  sut._observable = `${sut._observable}${modified}`;
  sut._observable_ref = `${sut._observable_ref}${modified}`;
  sut._observable_result = `${sut._observable_result}${modified}`;
  sut._observable_ref_result = `${sut._observable_ref_result}${modified}`;
  sut._validatable = `${sut._validatable}${modified}`;
  sut._validatable_ref = `${sut._validatable_ref}${modified}`;
  sut._validatable_result = `${sut._validatable_result}${modified}`;
  sut._validatable_ref_result = `${sut._validatable_ref_result}${modified}`;
  sut._validatable_async = `${sut._validatable_async}${modified}`;
  sut._validatable_ref_async = `${sut._validatable_ref_async}${modified}`;
  sut._validatable_result_async = `${sut._validatable_result_async}${modified}`;
  sut._validatable_ref_result_async = `${sut._validatable_ref_result_async}${modified}`;
  sut._parsable = `${sut._parsable}${modified}`;
  sut._parsable_ref = `${sut._parsable_ref}${modified}`;
  sut._parsable_async = `${sut._parsable_async}${modified}`;
  sut._parsable_ref_async = `${sut._parsable_ref_async}${modified}`;

  expect(sut).toStrictEqual({
    _observable: 'observable_modified',
    _observable_ref: 'observable:ref_modified',
    _observable_result: 'observable:result_modified',
    _observable_ref_result: 'observable:ref:result_modified',
    _validatable: 'validatable_modified',
    _validatable_ref: 'validatable:ref_modified',
    _validatable_result: 'validatable:result_modified',
    _validatable_ref_result: 'validatable:ref:result_modified',
    _validatable_async: 'validatable:async_modified',
    _validatable_ref_async: 'validatable:ref:async_modified',
    _validatable_result_async: 'validatable:result:async_modified',
    _validatable_ref_result_async: 'validatable:ref:result:async_modified',
    _parsable: 'parsable_modified',
    _parsable_ref: 'parsable:ref_modified',
    _parsable_async: 'parsable:async_modified',
    _parsable_ref_async: 'parsable:ref:async_modified',
  });
});

test(`proxy - 'result'`, async () => {
  const store = new ProxyViewModel();
  const resultProxy = proxy(store, 'result');
  const {
    _validatable_result_async,
    _validatable_ref_result_async,
    _parsable_async,
    _parsable_ref_async,
    ...sut
  } = resultProxy;
  expect(sut).toStrictEqual({
    _observable_result: 'observable:result',
    _observable_ref_result: 'observable:ref:result',
    _validatable_result: 'validatable:result',
    _validatable_ref_result: 'validatable:ref:result',
    _parsable: 'parsable_parsed',
    _parsable_ref: 'parsable:ref_parsed',
    _computed_result: 'computed:result',
    _computed_ref_result: 'computed:ref:result',
  });
  expect(await _validatable_result_async).toBe('validatable:result:async');
  expect(await _validatable_ref_result_async).toBe(
    'validatable:ref:result:async'
  );
  expect(await _parsable_async).toBe('parsable:async_parsed_async');
  expect(await _parsable_ref_async).toBe('parsable:ref:async_parsed_async');
});

test(`proxy - 'result' (validator.enabled = false)`, async () => {
  const store = new ProxyViewModel();
  store._validatable_result.validator.enabled = false;
  store._validatable_ref_result.validator.enabled = false;
  store._parsable.validator.enabled = false;
  store._parsable_ref.validator.enabled = false;

  store._validatable_result_async.validator.enabled = false;
  store._validatable_ref_result_async.validator.enabled = false;
  store._parsable_async.validator.enabled = false;
  store._parsable_ref_async.validator.enabled = false;

  const resultProxy = proxy(store, 'result');
  const {
    _validatable_result_async,
    _validatable_ref_result_async,
    _parsable_async,
    _parsable_ref_async,
    ...sut
  } = resultProxy;

  expect(sut).toStrictEqual({
    _observable_result: 'observable:result',
    _observable_ref_result: 'observable:ref:result',
    _validatable_result: undefined,
    _validatable_ref_result: undefined,
    _parsable: undefined,
    _parsable_ref: undefined,
    _computed_result: 'computed:result',
    _computed_ref_result: 'computed:ref:result',
  });
  expect(await _validatable_result_async).toBeUndefined();
  expect(await _validatable_ref_result_async).toBeUndefined();
  expect(await _parsable_async).toBeUndefined();
  expect(await _parsable_ref_async).toBeUndefined();
});

test(`proxy - 'error'`, () => {
  const store = new ProxyViewModel();
  const sut = proxy(store, 'error');
  expect(sut).toStrictEqual({
    _validatable: false,
    _validatable_ref: false,
    _validatable_result: false,
    _validatable_ref_result: false,
    _validatable_async: false,
    _validatable_ref_async: false,
    _validatable_result_async: false,
    _validatable_ref_result_async: false,
    _parsable: false,
    _parsable_ref: false,
    _parsable_async: false,
    _parsable_ref_async: false,
  });

  Object.keys(sut).forEach((key) => {
    (sut as any)[key] = true;
  });

  expect(sut).toStrictEqual({
    _validatable: true,
    _validatable_ref: true,
    _validatable_result: true,
    _validatable_ref_result: true,
    _validatable_async: true,
    _validatable_ref_async: true,
    _validatable_result_async: true,
    _validatable_ref_result_async: true,
    _parsable: true,
    _parsable_ref: true,
    _parsable_async: true,
    _parsable_ref_async: true,
  });
});

test(`proxy - 'message'`, () => {
  const store = new ProxyViewModel();
  const sut = proxy(store, 'message');
  expect(sut).toStrictEqual({
    _validatable: '',
    _validatable_ref: '',
    _validatable_result: '',
    _validatable_ref_result: '',
    _validatable_async: '',
    _validatable_ref_async: '',
    _validatable_result_async: '',
    _validatable_ref_result_async: '',
    _parsable: '',
    _parsable_ref: '',
    _parsable_async: '',
    _parsable_ref_async: '',
  });

  Object.keys(sut).forEach((key) => {
    (sut as any)[key] = `${key}_message`;
  });

  expect(sut).toStrictEqual({
    _validatable: '_validatable_message',
    _validatable_ref: '_validatable_ref_message',
    _validatable_result: '_validatable_result_message',
    _validatable_ref_result: '_validatable_ref_result_message',
    _validatable_async: '_validatable_async_message',
    _validatable_ref_async: '_validatable_ref_async_message',
    _validatable_result_async: '_validatable_result_async_message',
    _validatable_ref_result_async: '_validatable_ref_result_async_message',
    _parsable: '_parsable_message',
    _parsable_ref: '_parsable_ref_message',
    _parsable_async: '_parsable_async_message',
    _parsable_ref_async: '_parsable_ref_async_message',
  });
});

test(`proxy - unsupported builtin filter`, () => {
  const store = new ProxyViewModel();
  expect(() => proxy(store, 'unsupported' as any)).toThrowError(
    `${UNSUPPORTED_PROXY_NAME} 'unsupported'`
  );
});
test(`proxy - no filter`, () => {
  const store = new ProxyViewModel();
  const sut = proxy(store, (obj) => obj.$$vmObjType);
  expect(sut).toStrictEqual({
    _ref: 0x80,
    _observable: 0x07,
    _observable_ref: 0x87,
    _observable_result: 0x0f,
    _observable_ref_result: 0x8f,
    _validatable: 0x17,
    _validatable_ref: 0x97,
    _validatable_result: 0x1f,
    _validatable_ref_result: 0x9f,
    _validatable_async: 0x57,
    _validatable_ref_async: 0xd7,
    _validatable_result_async: 0x5f,
    _validatable_ref_result_async: 0xdf,
    _parsable: 0x3f,
    _parsable_ref: 0xbf,
    _parsable_async: 0x7f,
    _parsable_ref_async: 0xff,
    _computed: 0x03,
    _computed_ref: 0x83,
    _computed_result: 0x0b,
    _computed_ref_result: 0x8b,
  });
});

test(`proxy - { ref: true }`, () => {
  const store = new ProxyViewModel();
  const sut = proxy<ProxyViewModel, string>(
    store,
    { ref: true },
    (prop: Ref<unknown>) => prop.ref.current as string,
    (prop: Ref<unknown>, _: string, value: string) => {
      prop.bindRef()(value);
    }
  );
  expect(sut).toStrictEqual({
    _ref: 'ref_ref',
    _observable_ref: 'observable:ref_ref',
    _observable_ref_result: 'observable:ref:result_ref',
    _validatable_ref: 'validatable:ref_ref',
    _validatable_ref_result: 'validatable:ref:result_ref',
    _validatable_ref_async: 'validatable:ref:async_ref',
    _validatable_ref_result_async: 'validatable:ref:result:async_ref',
    _parsable_ref: 'parsable:ref_ref',
    _parsable_ref_async: 'parsable:ref:async_ref',
    _computed_ref: 'computed:ref_ref',
    _computed_ref_result: 'computed:ref:result_ref',
  });

  Object.keys(sut).forEach((key) => {
    const s: any = sut;
    s[key] = `${s[key]}_modified`;
  });

  expect(sut).toStrictEqual({
    _ref: 'ref_ref_modified',
    _observable_ref: 'observable:ref_ref_modified',
    _observable_ref_result: 'observable:ref:result_ref_modified',
    _validatable_ref: 'validatable:ref_ref_modified',
    _validatable_ref_result: 'validatable:ref:result_ref_modified',
    _validatable_ref_async: 'validatable:ref:async_ref_modified',
    _validatable_ref_result_async: 'validatable:ref:result:async_ref_modified',
    _parsable_ref: 'parsable:ref_ref_modified',
    _parsable_ref_async: 'parsable:ref:async_ref_modified',
    _computed_ref: 'computed:ref_ref_modified',
    _computed_ref_result: 'computed:ref:result_ref_modified',
  });
});

test(`proxy - { value: true, observable: false }`, () => {
  const store = new ProxyViewModel();
  const sut = proxy(
    store,
    { value: true, observable: false },
    (prop: DependencyValue<any>) => prop.value
  );
  expect(sut).toStrictEqual({
    _computed: 'computed',
    _computed_ref: 'computed:ref',
    _computed_result: 'computed:result',
    _computed_ref_result: 'computed:ref:result',
  });
});

test(`proxy - { value: true, ref: false, async: false }`, () => {
  const store = new ProxyViewModel();
  const sut = proxy(
    store,
    { value: true, ref: false, async: false },
    (prop: DependencyValue<any>) => prop.value
  );
  expect(sut).toStrictEqual({
    _observable: 'observable',
    _observable_result: 'observable:result',
    _validatable: 'validatable',
    _validatable_result: 'validatable:result',
    _parsable: 'parsable',
    _computed: 'computed',
    _computed_result: 'computed:result',
  });
});
test(`proxy - { value: true }`, () => {
  const store = new ProxyViewModel();
  const sut = proxy(
    store,
    { value: true },
    (prop: DependencyValue<any>) => prop.value
  );
  expect(sut).toStrictEqual({
    _observable: 'observable',
    _observable_ref: 'observable:ref',
    _observable_result: 'observable:result',
    _observable_ref_result: 'observable:ref:result',
    _validatable: 'validatable',
    _validatable_ref: 'validatable:ref',
    _validatable_result: 'validatable:result',
    _validatable_ref_result: 'validatable:ref:result',
    _validatable_async: 'validatable:async',
    _validatable_ref_async: 'validatable:ref:async',
    _validatable_result_async: 'validatable:result:async',
    _validatable_ref_result_async: 'validatable:ref:result:async',
    _parsable: 'parsable',
    _parsable_ref: 'parsable:ref',
    _parsable_async: 'parsable:async',
    _parsable_ref_async: 'parsable:ref:async',
    _computed: 'computed',
    _computed_ref: 'computed:ref',
    _computed_result: 'computed:result',
    _computed_ref_result: 'computed:ref:result',
  });
});

test(`proxy - { observable: true }`, () => {
  const store = new ProxyViewModel();
  const sut = proxy(
    store,
    { observable: true },
    (prop: Observable<any>) => prop.value
  );
  expect(sut).toStrictEqual({
    _observable: 'observable',
    _observable_ref: 'observable:ref',
    _observable_result: 'observable:result',
    _observable_ref_result: 'observable:ref:result',
    _validatable: 'validatable',
    _validatable_ref: 'validatable:ref',
    _validatable_result: 'validatable:result',
    _validatable_ref_result: 'validatable:ref:result',
    _validatable_async: 'validatable:async',
    _validatable_ref_async: 'validatable:ref:async',
    _validatable_result_async: 'validatable:result:async',
    _validatable_ref_result_async: 'validatable:ref:result:async',
    _parsable: 'parsable',
    _parsable_ref: 'parsable:ref',
    _parsable_async: 'parsable:async',
    _parsable_ref_async: 'parsable:ref:async',
  });
});

test(`proxy - { value: true, result: true }`, async () => {
  const store = new ProxyViewModel();
  const resultProxy = proxy(
    store,
    { value: true, result: true },
    (prop: Result<unknown>) => prop.result
  );
  const {
    _validatable_result_async,
    _validatable_ref_result_async,
    _parsable_async,
    _parsable_ref_async,
    ...sut
  } = resultProxy;
  expect(sut).toStrictEqual({
    _observable_result: 'observable:result',
    _observable_ref_result: 'observable:ref:result',
    _validatable_result: 'validatable:result',
    _validatable_ref_result: 'validatable:ref:result',
    _parsable: 'parsable_parsed',
    _parsable_ref: 'parsable:ref_parsed',
    _computed_result: 'computed:result',
    _computed_ref_result: 'computed:ref:result',
  });
  expect(await _validatable_result_async).toBe('validatable:result:async');
  expect(await _validatable_ref_result_async).toBe(
    'validatable:ref:result:async'
  );
  expect(await _parsable_async).toBe('parsable:async_parsed_async');
  expect(await _parsable_ref_async).toBe('parsable:ref:async_parsed_async');
});

test(`proxy - { validatable: true }`, async () => {
  const store = new ProxyViewModel();
  const sut = proxy(
    store,
    { validatable: true },
    (prop: Validatable<any, any>) => prop.value
  );
  expect(sut).toStrictEqual({
    _validatable: 'validatable',
    _validatable_ref: 'validatable:ref',
    _validatable_result: 'validatable:result',
    _validatable_ref_result: 'validatable:ref:result',
    _validatable_async: 'validatable:async',
    _validatable_ref_async: 'validatable:ref:async',
    _validatable_result_async: 'validatable:result:async',
    _validatable_ref_result_async: 'validatable:ref:result:async',
    _parsable: 'parsable',
    _parsable_ref: 'parsable:ref',
    _parsable_async: 'parsable:async',
    _parsable_ref_async: 'parsable:ref:async',
  });
});

test(`proxy - { async: true }`, async () => {
  const store = new ProxyViewModel();
  const sut = proxy(
    store,
    { async: true },
    (prop: Validatable<any, true>) => prop.value
  );
  expect(sut).toStrictEqual({
    _validatable_async: 'validatable:async',
    _validatable_ref_async: 'validatable:ref:async',
    _validatable_result_async: 'validatable:result:async',
    _validatable_ref_result_async: 'validatable:ref:result:async',
    _parsable_async: 'parsable:async',
    _parsable_ref_async: 'parsable:ref:async',
  });
});

test(`resolveObject`, async () => {
  const store = new ProxyViewModel();
  const resultProxy = proxy(store, 'result');
  const sut = resolveObject(resultProxy);
  expect(await sut).toStrictEqual({
    _observable_result: 'observable:result',
    _observable_ref_result: 'observable:ref:result',
    _validatable_result: 'validatable:result',
    _validatable_ref_result: 'validatable:ref:result',
    _validatable_result_async: 'validatable:result:async',
    _validatable_ref_result_async: 'validatable:ref:result:async',
    _parsable: 'parsable_parsed',
    _parsable_ref: 'parsable:ref_parsed',
    _parsable_async: 'parsable:async_parsed_async',
    _parsable_ref_async: 'parsable:ref:async_parsed_async',
    _computed_result: 'computed:result',
    _computed_ref_result: 'computed:ref:result',
  });
});
