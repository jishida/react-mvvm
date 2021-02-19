import {
  parsable,
  SyncOrAsync,
  validatable,
  Validatable,
} from '@jishida/react-mvvm';
import { VALIDATION_FAILURE } from '../utils/constants';
import { validationOptionsCases } from '../utils/extensionsOptions';
import { getObservableOptionsCases } from '../utils/options';

jest.useFakeTimers();

type Factory<A extends boolean = false> = (
  v: string,
  fn: () => SyncOrAsync<void, A>,
  opts: any
) => Validatable<string, A>;

type AsyncFactory = Factory<true>;

const validatableCases = getObservableOptionsCases()
  .filter((c) => c[0].split(':').some((v) => /^validatable|parsable$/.test(v)))
  .map(
    (c) =>
      [
        c[0],
        c[1],
        c[0].split(':').includes('parsable') ? parsable : validatable,
      ] as [string, any, Factory<any>]
  );

const syncValidatableCases = validatableCases.filter(
  (c) => !(c[1] as any).async
);

const asyncValidatableCases = validatableCases.filter(
  (c) => (c[1] as any).async
);

test.each(syncValidatableCases)(
  `Validatable (%s) - validate func throws Error`,
  (_: string, options: any, factory: Factory) => {
    const errorMessage = 'error message';
    const sut = factory(
      'init',
      () => {
        throw new Error(errorMessage);
      },
      { ...options }
    );
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(sut.validate()).toBe(false);
    expect(sut.hasError.value).toBe(true);
    expect(sut.errorMessage.value).toBe(errorMessage);
    if (sut.spec & 0x08) {
      expect(() => (sut as any).result).toThrowError(VALIDATION_FAILURE);
    }
  }
);

test.each(asyncValidatableCases)(
  `Validatable (%s) - validate func throws Error`,
  async (_: string, options: any, factory: AsyncFactory) => {
    const errorMessage = 'error message';
    const sut = factory(
      'init',
      async () => {
        throw new Error(errorMessage);
      },
      { ...options }
    );
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(await sut.validate()).toBe(false);
    expect(sut.hasError.value).toBe(true);
    expect(sut.errorMessage.value).toBe(errorMessage);
    if (sut.spec & 0x08) {
      await expect((sut as any).result).rejects.toThrowError(
        VALIDATION_FAILURE
      );
    }
  }
);

test.each(syncValidatableCases)(
  `Validatable (%s) - validate func throws string`,
  (_: string, options: any, factory: Factory) => {
    const errorMessage = 'error message';
    const sut = factory(
      'init',
      () => {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw errorMessage;
      },
      { ...options }
    );
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(sut.validate()).toBe(false);
    expect(sut.hasError.value).toBe(true);
    expect(sut.errorMessage.value).toBe(errorMessage);
    if (sut.spec & 0x08) {
      expect(() => (sut as any).result).toThrowError(VALIDATION_FAILURE);
    }
  }
);

test.each(asyncValidatableCases)(
  `Validatable (%s) - validate func throws string`,
  async (_: string, options: any, factory: AsyncFactory) => {
    const errorMessage = 'error message';
    const sut = factory(
      'init',
      async () => {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw errorMessage;
      },
      { ...options }
    );
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(await sut.validate()).toBe(false);
    expect(sut.hasError.value).toBe(true);
    expect(sut.errorMessage.value).toBe(errorMessage);
    if (sut.spec & 0x08) {
      await expect((sut as any).result).rejects.toThrowError(
        VALIDATION_FAILURE
      );
    }
  }
);

test.each(syncValidatableCases)(
  `Validatable (%s) - validate func throws something`,
  (_: string, options: any, factory: Factory) => {
    const sut = factory(
      'init',
      () => {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw 0;
      },
      { ...options }
    );
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(sut.validate()).toBe(false);
    expect(sut.hasError.value).toBe(true);
    expect(sut.errorMessage.value).toBe('');
    if (sut.spec & 0x08) {
      expect(() => (sut as any).result).toThrowError('Validation failure');
    }
  }
);

test.each(asyncValidatableCases)(
  `Validatable (%s) - validate func throws something`,
  async (_: string, options: any, factory: AsyncFactory) => {
    const sut = factory(
      'init',
      async () => {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw 0;
      },
      { ...options }
    );
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(await sut.validate()).toBe(false);
    expect(sut.hasError.value).toBe(true);
    expect(sut.errorMessage.value).toBe('');
    if (sut.spec & 0x08) {
      await expect((sut as any).result).rejects.toThrowError(
        VALIDATION_FAILURE
      );
    }
  }
);

test.each(syncValidatableCases)(
  `Validatable (%s) - strategy: 'watch'`,
  (_: string, options: any, factory: Factory) => {
    const errorMessage = 'error message';
    const sut = factory(
      'init',
      () => {
        throw new Error(errorMessage);
      },
      {
        ...options,
        strategy: 'watch',
      }
    );

    sut.notify();
    expect(sut.hasError.value).toBe(true);
    expect(sut.errorMessage.value).toBe(errorMessage);
  }
);

test.each(asyncValidatableCases)(
  `Validatable (%s) - strategy: 'watch'`,
  async (_: string, options: any, factory: AsyncFactory) => {
    const errorMessage = 'error message';
    const sut = factory(
      'init',
      async () => {
        throw new Error(errorMessage);
      },
      {
        ...options,
        strategy: 'watch',
      }
    );

    sut.notify();
    expect(sut.validator.currentTask).toBeTruthy();
    expect(await sut.validator.currentTask).toBe(false);
    expect(sut.hasError.value).toBe(true);
    expect(sut.errorMessage.value).toBe(errorMessage);
  }
);

test.each(syncValidatableCases)(
  `Validatable (%s) - strategy: 'watch', delay: 1000`,
  (_: string, options: any, factory: Factory) => {
    const errorMessage = 'error message';
    const validateFn = jest.fn(() => {
      throw new Error(errorMessage);
    });
    const sut = factory('init', validateFn, {
      ...options,
      strategy: 'watch',
      delay: 1000,
    });

    sut.notify();
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(validateFn).not.toBeCalled();

    sut.notify();
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(validateFn).not.toBeCalled();

    jest.runAllTimers();
    expect(sut.hasError.value).toBe(true);
    expect(sut.errorMessage.value).toBe(errorMessage);
    expect(validateFn).toBeCalledTimes(1);

    sut.validator.reset();
    sut.notify();
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(validateFn).toBeCalledTimes(1);

    sut.validator.reset();
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(validateFn).toBeCalledTimes(1);

    jest.runAllTimers();
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(validateFn).toBeCalledTimes(1);
  }
);

test.each(asyncValidatableCases)(
  `Validatable (%s) - strategy: 'watch', delay: 1000`,
  async (_: string, options: any, factory: AsyncFactory) => {
    const errorMessage = 'error message';
    const validateFn = jest.fn(async () => {
      throw new Error(errorMessage);
    });
    const sut = factory('init', validateFn, {
      ...options,
      strategy: 'watch',
      delay: 1000,
    });

    sut.notify();
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(sut.validator.currentTask).toBeUndefined();
    expect(validateFn).not.toBeCalled();

    sut.notify();
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(sut.validator.currentTask).toBeUndefined();
    expect(validateFn).not.toBeCalled();

    jest.runAllTimers();
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(sut.validator.currentTask).toBeTruthy();

    expect(await sut.validator.currentTask).toBe(false);
    expect(sut.hasError.value).toBe(true);
    expect(sut.errorMessage.value).toBe(errorMessage);
    expect(validateFn).toBeCalledTimes(1);

    sut.validator.reset();
    sut.notify();
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(sut.validator.currentTask).toBeUndefined();
    expect(validateFn).toBeCalledTimes(1);

    sut.validator.reset();
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(sut.validator.currentTask).toBeUndefined();
    expect(validateFn).toBeCalledTimes(1);

    jest.runAllTimers();
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(sut.validator.currentTask).toBeUndefined();
    expect(validateFn).toBeCalledTimes(1);
  }
);

test.each(syncValidatableCases)(
  `Validatable (%s) - strategy: 'watch', lazy: true`,
  (_: string, options: any, factory: Factory) => {
    const errorMessage = 'error message';
    const sut = factory(
      'init',
      () => {
        throw new Error(errorMessage);
      },
      {
        ...options,
        strategy: 'watch',
        lazy: true,
      }
    );

    sut.notify();
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');

    expect(sut.validate()).toBe(false);
    expect(sut.hasError.value).toBe(true);
    expect(sut.errorMessage.value).toBe(errorMessage);

    sut.validator.reset();
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');

    sut.notify();
    expect(sut.hasError.value).toBe(true);
    expect(sut.errorMessage.value).toBe(errorMessage);
  }
);

test.each(asyncValidatableCases)(
  `Validatable (%s) - strategy: 'watch', lazy: true`,
  async (_: string, options: any, factory: AsyncFactory) => {
    const errorMessage = 'error message';
    const sut = factory(
      'init',
      async () => {
        throw new Error(errorMessage);
      },
      {
        ...options,
        strategy: 'watch',
        lazy: true,
      }
    );

    sut.notify();
    expect(sut.validator.currentTask).toBeUndefined();
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');

    expect(await sut.validate()).toBe(false);
    expect(sut.validator.currentTask).toBeUndefined();
    expect(sut.hasError.value).toBe(true);
    expect(sut.errorMessage.value).toBe(errorMessage);

    sut.validator.reset();
    expect(sut.validator.currentTask).toBeUndefined();
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');

    sut.notify();
    expect(sut.validator.currentTask).toBeTruthy();
    expect(await sut.validator.currentTask).toBe(false);
    expect(sut.hasError.value).toBe(true);
    expect(sut.errorMessage.value).toBe(errorMessage);
  }
);

test.each(syncValidatableCases)(
  `Validatable (%s) - strategy: 'watch', delay: 1000, lazy: true`,
  (_: string, options: any, factory: Factory) => {
    const errorMessage = 'error message';
    const sut = factory(
      'init',
      () => {
        throw new Error(errorMessage);
      },
      {
        ...options,
        strategy: 'watch',
        delay: 1000,
        lazy: true,
      }
    );

    sut.notify();
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');

    jest.runAllTimers();
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');

    sut.validate();
    expect(sut.hasError.value).toBe(true);
    expect(sut.errorMessage.value).toBe(errorMessage);

    sut.validator.reset();
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');

    sut.notify();
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');

    jest.runAllTimers();
    expect(sut.hasError.value).toBe(true);
    expect(sut.errorMessage.value).toBe(errorMessage);
  }
);

test.each(asyncValidatableCases)(
  `Validatable (%s) - strategy: 'watch', delay: 1000, lazy: true`,
  async (_: string, options: any, factory: AsyncFactory) => {
    const errorMessage = 'error message';
    const sut = factory(
      'init',
      async () => {
        throw new Error(errorMessage);
      },
      {
        ...options,
        strategy: 'watch',
        delay: 1000,
        lazy: true,
      }
    );

    sut.notify();
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(sut.validator.currentTask).toBeUndefined();

    jest.runAllTimers();
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(sut.validator.currentTask).toBeUndefined();

    expect(await sut.validate()).toBe(false);
    expect(sut.hasError.value).toBe(true);
    expect(sut.errorMessage.value).toBe(errorMessage);
    expect(sut.validator.currentTask).toBeUndefined();

    sut.validator.reset();
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(sut.validator.currentTask).toBeUndefined();

    sut.notify();
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(sut.validator.currentTask).toBeUndefined();

    jest.runAllTimers();
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(sut.validator.currentTask).toBeTruthy();

    expect(await sut.validator.currentTask).toBe(false);
    expect(sut.hasError.value).toBe(true);
    expect(sut.errorMessage.value).toBe(errorMessage);
  }
);

test.each(
  syncValidatableCases.reduce<[string, string, any, Factory, any][]>(
    (cases, [implKey, options, factory]) => {
      validationOptionsCases.forEach(
        ([optsKey, validationOptions, expected]) => {
          cases.push([
            implKey,
            optsKey,
            { ...options, ...validationOptions },
            factory,
            expected,
          ]);
        }
      );
      return cases;
    },
    []
  )
)(
  `Validatable (%s) - configuration %s`,
  (_a: string, _b: string, options: any, factory: Factory, expected: any) => {
    const sut = factory('', () => {}, options);
    expect(sut.validator.enabled).toBe(expected.enabled);
    expect(sut.validator.strategy).toBe(expected.strategy);
    expect(sut.validator.watch).toBe(expected.watch);
    expect(sut.validator.delay).toBe(expected.delay);
    expect(sut.validator.lazy).toBe(expected.lazy);
  }
);
