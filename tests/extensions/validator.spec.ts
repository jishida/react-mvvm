import {
  AsyncViewModelValidator,
  parsable,
  validatable,
  ValidationOptions,
  validator,
} from '@jishida/react-mvvm';
import { validationOptionsCases } from '../utils/extensionsOptions';

jest.useFakeTimers();

const ERROR_MESSAGE = 'error message';

class ValidatorViewModel {
  validateSync = jest.fn(() => {
    this._validate();
  });
  validateAsync = jest.fn(async () => {
    this._validate();
  });
  parseSync = jest.fn(() => {
    this._validate();
  });
  parseAsync = jest.fn(async () => {
    this._validate();
  });

  validatableSync = validatable('', this.validateSync);
  validatableAsync = validatable('', this.validateAsync, { async: true });
  parsableSync = parsable('', this.parseSync);
  parsableAsync = parsable('', this.parseAsync, { async: true });

  _throw = false;
  _validate() {
    if (this._throw) {
      throw new Error(ERROR_MESSAGE);
    }
  }
}

const expected: any = {};

beforeEach(() => {
  expected.validateSyncCalledTimes = 0;
  expected.validateAsyncCalledTimes = 0;
  expected.parseSyncCalledTimes = 0;
  expected.parseAsyncCalledTimes = 0;

  expected.validatableSyncParent = undefined;
  expected.validatableAsyncParent = undefined;
  expected.parsableSyncParent = undefined;
  expected.parsableAsyncParent = undefined;
});

function testViewModel(store: ValidatorViewModel) {
  expect(store.validateSync).toBeCalledTimes(expected.validateSyncCalledTimes);
  expect(store.validateAsync).toBeCalledTimes(
    expected.validateAsyncCalledTimes
  );
  expect(store.parseSync).toBeCalledTimes(expected.parseSyncCalledTimes);
  expect(store.parseAsync).toBeCalledTimes(expected.parseAsyncCalledTimes);

  expect(store.validatableSync.validator.parent).toBe(
    expected.validatableSyncParent
  );
  expect(store.validatableAsync.validator.parent).toBe(
    expected.validatableAsyncParent
  );
  expect(store.parsableSync.validator.parent).toBe(expected.parsableSyncParent);
  expect(store.parsableAsync.validator.parent).toBe(
    expected.parsableAsyncParent
  );
}

test(`ViewModelValidator - basic usage`, () => {
  const sut = validator();

  expect(sut.validate()).toBe(true);

  const store = new ValidatorViewModel();
  testViewModel(store);

  expect(sut.register(store)).toBe(sut);
  expected.validatableSyncParent = sut;
  expected.parsableSyncParent = sut;
  testViewModel(store);

  expect(sut.validate()).toBe(true);
  expected.validateSyncCalledTimes += 1;
  expected.parseSyncCalledTimes += 1;
  testViewModel(store);

  expect(sut.validate()).toBe(true);
  testViewModel(store);

  sut.reset();
  expect(sut.validate()).toBe(true);
  expected.validateSyncCalledTimes += 1;
  expected.parseSyncCalledTimes += 1;
  testViewModel(store);

  sut.reset();
  sut.unregister(store);
  expected.validatableSyncParent = undefined;
  expected.parsableSyncParent = undefined;
  testViewModel(store);

  expect(sut.validate()).toBe(true);
  testViewModel(store);
});

test(`AsyncViewModelValidator - basic usage`, async () => {
  const sut = validator({ async: true });

  expect(await sut.validate()).toBe(true);

  const store = new ValidatorViewModel();
  testViewModel(store);

  expect(sut.register(store)).toBe(sut);
  expected.validatableSyncParent = sut;
  expected.parsableSyncParent = sut;
  expected.validatableAsyncParent = sut;
  expected.parsableAsyncParent = sut;
  testViewModel(store);

  expect(await sut.validate()).toBe(true);
  expected.validateSyncCalledTimes += 1;
  expected.parseSyncCalledTimes += 1;
  expected.validateAsyncCalledTimes += 1;
  expected.parseAsyncCalledTimes += 1;
  testViewModel(store);

  expect(await sut.validate()).toBe(true);
  testViewModel(store);

  sut.reset();
  expect(await sut.validate()).toBe(true);
  expected.validateSyncCalledTimes += 1;
  expected.parseSyncCalledTimes += 1;
  expected.validateAsyncCalledTimes += 1;
  expected.parseAsyncCalledTimes += 1;
  testViewModel(store);

  sut.reset();
  sut.unregister(store);
  expected.validatableSyncParent = undefined;
  expected.parsableSyncParent = undefined;
  expected.validatableAsyncParent = undefined;
  expected.parsableAsyncParent = undefined;
  testViewModel(store);

  expect(await sut.validate()).toBe(true);
  testViewModel(store);
});

test(`AsyncViewModelValidator - ignore disabled validator`, async () => {
  const sut = validator({ async: true });

  expect(await sut.validate()).toBe(true);

  const store = new ValidatorViewModel();
  testViewModel(store);

  expect(sut.register(store)).toBe(sut);
  expected.validatableSyncParent = sut;
  expected.parsableSyncParent = sut;
  expected.validatableAsyncParent = sut;
  expected.parsableAsyncParent = sut;
  testViewModel(store);

  store.validatableSync.validator.enabled = false;
  store.validatableAsync.validator.enabled = false;
  store.parsableSync.validator.enabled = false;
  store.parsableAsync.validator.enabled = false;
  expect(await sut.validate()).toBe(true);
  testViewModel(store);
});

test(`AsyncViewModelValidator - register array`, () => {
  const sut = validator({ async: true });
  const store = new ValidatorViewModel();
  const validatableList = [
    store.validatableSync,
    store.parsableSync,
    store.validatableAsync.validator,
    store.parsableAsync.validator,
  ];

  sut.register(validatableList);
  expected.validatableSyncParent = sut;
  expected.parsableSyncParent = sut;
  expected.validatableAsyncParent = sut;
  expected.parsableAsyncParent = sut;
  testViewModel(store);

  sut.register(store);
  testViewModel(store);

  sut.unregister(store);
  testViewModel(store);

  sut.unregister(validatableList);
  expected.validatableSyncParent = undefined;
  expected.parsableSyncParent = undefined;
  expected.validatableAsyncParent = undefined;
  expected.parsableAsyncParent = undefined;
  testViewModel(store);
});

test(`AsyncViewModelValidator - register Validatable`, () => {
  const sut = validator({ async: true });
  const store = new ValidatorViewModel();

  sut.register(store.validatableSync);
  expected.validatableSyncParent = sut;
  testViewModel(store);

  sut.register(store.parsableSync);
  expected.parsableSyncParent = sut;
  testViewModel(store);

  sut.register(store.validatableAsync);
  expected.validatableAsyncParent = sut;
  testViewModel(store);

  sut.register(store.parsableAsync);
  expected.parsableAsyncParent = sut;
  testViewModel(store);

  sut.register(store);
  testViewModel(store);

  sut.unregister(store);
  testViewModel(store);

  sut.unregister(store.validatableSync);
  expected.validatableSyncParent = undefined;
  testViewModel(store);

  sut.unregister(store.parsableSync);
  expected.parsableSyncParent = undefined;
  testViewModel(store);

  sut.unregister(store.validatableAsync);
  expected.validatableAsyncParent = undefined;
  testViewModel(store);

  sut.unregister(store.parsableAsync);
  expected.parsableAsyncParent = undefined;
  testViewModel(store);
});

test(`AsyncViewModelValidator - register ObjectValidator`, () => {
  const sut = validator({ async: true });
  const store = new ValidatorViewModel();

  sut.register(store.validatableSync.validator);
  expected.validatableSyncParent = sut;
  testViewModel(store);

  sut.register(store.parsableSync.validator);
  expected.parsableSyncParent = sut;
  testViewModel(store);

  sut.register(store.validatableAsync.validator);
  expected.validatableAsyncParent = sut;
  testViewModel(store);

  sut.register(store.parsableAsync.validator);
  expected.parsableAsyncParent = sut;
  testViewModel(store);

  sut.register(store);
  testViewModel(store);

  sut.unregister(store);
  testViewModel(store);

  sut.unregister(store.validatableSync.validator);
  expected.validatableSyncParent = undefined;
  testViewModel(store);

  sut.unregister(store.parsableSync.validator);
  expected.parsableSyncParent = undefined;
  testViewModel(store);

  sut.unregister(store.validatableAsync.validator);
  expected.validatableAsyncParent = undefined;
  testViewModel(store);

  sut.unregister(store.parsableAsync.validator);
  expected.parsableAsyncParent = undefined;
  testViewModel(store);
});

test(`ViewModelValidator - register ViewModelValidator`, () => {
  const sut = validator();
  const child = validator();

  sut.register(child);
  expect(child.parent).toBe(sut);

  sut.unregister(child);
  expect(child.parent).toBeUndefined();
});

test(`ViewModelValidator - validation failure`, () => {
  const sut = validator();
  const store = new ValidatorViewModel();
  store._throw = true;

  sut.register(store);

  expect(sut.validate()).toBe(false);
  expect(store.validatableSync.hasError.value).toBe(true);
  expect(store.validatableAsync.hasError.value).toBe(false);
  expect(store.parsableSync.hasError.value).toBe(true);
  expect(store.parsableAsync.hasError.value).toBe(false);
  expect(store.validatableSync.errorMessage.value).toBe(ERROR_MESSAGE);
  expect(store.validatableAsync.errorMessage.value).toBe('');
  expect(store.parsableSync.errorMessage.value).toBe(ERROR_MESSAGE);
  expect(store.parsableAsync.errorMessage.value).toBe('');
});

test.each([true, false])(
  `AsyncViewModelValidator - validation failure (parallel: %s)`,
  async (parallel: boolean) => {
    const sut = validator({ async: true, parallel });
    const store = new ValidatorViewModel();
    store._throw = true;

    sut.register(store);

    expect(await sut.validate()).toBe(false);
    expect(store.validatableSync.hasError.value).toBe(true);
    expect(store.validatableAsync.hasError.value).toBe(true);
    expect(store.parsableSync.hasError.value).toBe(true);
    expect(store.parsableAsync.hasError.value).toBe(true);
    expect(store.validatableSync.errorMessage.value).toBe(ERROR_MESSAGE);
    expect(store.validatableAsync.errorMessage.value).toBe(ERROR_MESSAGE);
    expect(store.parsableSync.errorMessage.value).toBe(ERROR_MESSAGE);
    expect(store.parsableAsync.errorMessage.value).toBe(ERROR_MESSAGE);
  }
);

function wait(callback: () => void, delay: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      callback();
      resolve();
    }, delay);
  });
}

class OrderViewModel {
  order: string[] = [];

  mid = validatable(
    '',
    async () =>
      wait(() => {
        this.order.push('mid');
      }, 500),
    { async: true }
  );
  long = validatable(
    '',
    async () =>
      wait(() => {
        this.order.push('long');
      }, 1000),
    { async: true }
  );
  short = validatable(
    '',
    async () =>
      wait(() => {
        this.order.push('short');
      }, 100),
    { async: true }
  );
  sync = validatable('', () => {
    this.order.push('sync');
  });

  validator: AsyncViewModelValidator;

  constructor(parallel: boolean) {
    this.validator = validator({ async: true, parallel }).register(this);
  }

  async validate() {
    this.order.splice(0);
    return this.validator.validate();
  }
}

test(`AsyncViewModelValidator - sequential validation`, async () => {
  async function runTimers() {
    jest.runAllTimers();
  }
  const sut = new OrderViewModel(false);
  const promise = sut.validate();
  while (sut.order.length < 3) {
    // eslint-disable-next-line no-await-in-loop
    await runTimers();
  }
  expect(await promise).toBe(true);
  expect(sut.order).toEqual(['mid', 'long', 'short', 'sync']);
});

test(`AsyncViewModelValidator - parallel validation`, async () => {
  const sut = new OrderViewModel(true);
  const promise = sut.validate();
  jest.runAllTimers();
  expect(await promise).toBe(true);
  expect(sut.order).toEqual(['sync', 'short', 'mid', 'long']);
});

test(`ViewModelValidator - invalid registration`, () => {
  const sut = validator();
  expect(sut.register([])).toBe(sut);
  expect(sut.unregister([])).toBe(sut);
});

test.each(validationOptionsCases)(
  `ViewModelValidator - configuration %s`,
  (_: string, options: ValidationOptions, _expected: any) => {
    const sut = validator({ ...options });
    expect(sut.enabled).toBe(_expected.enabled);
    expect(sut.strategy).toBe(_expected.strategy);
    expect(sut.watch).toBe(_expected.watch);
    expect(sut.delay).toBe(_expected.delay);
    expect(sut.lazy).toBe(_expected.lazy);
  }
);

test.each(validationOptionsCases)(
  `AsyncViewModelValidator - configuration %s`,
  (_: string, options: ValidationOptions, _expected: any) => {
    const sut = validator({ ...options, async: true });
    expect(sut.enabled).toBe(_expected.enabled);
    expect(sut.strategy).toBe(_expected.strategy);
    expect(sut.watch).toBe(_expected.watch);
    expect(sut.delay).toBe(_expected.delay);
    expect(sut.lazy).toBe(_expected.lazy);
  }
);
