import { parsable, AsyncObjectValidator } from '@jishida/react-mvvm';
import { VALIDATION_FAILURE } from '../utils/constants';
import { getObservableOptionsCases } from '../utils/options';

const parsableCases = getObservableOptionsCases().filter((c) =>
  c[0].split(':').includes('parsable')
);

const syncValidatableCases = parsableCases.filter((c) => !(c[1] as any).async);

const asyncValidatableCases = parsableCases.filter((c) => (c[1] as any).async);

test.each(syncValidatableCases)(
  `Validatable (%s) - validate func returns parsed value`,
  (_: string, options: any) => {
    const parsedValue = 'parsed value';
    const sut = parsable('init', () => parsedValue, { ...options });
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(sut.validate()).toBe(true);
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(sut.result).toBe(parsedValue);
  }
);

test.each(asyncValidatableCases)(
  `Validatable (%s) - validate func returns parsed value`,
  async (_: string, options: any) => {
    const parsedValue = 'parsed value';
    const sut = parsable<string, string>('init', async () => parsedValue, {
      ...options,
    });
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(await sut.validate()).toBe(true);
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(await sut.result).toBe(parsedValue);
  }
);

test.each(asyncValidatableCases)(
  `Validatable (%s) - result property success`,
  async (_: string, options: any) => {
    jest.useFakeTimers();
    const parsedValue = 'parsed value';
    const sut = parsable<string, string>(
      'invalid',
      async (value) =>
        new Promise((resolve, reject) =>
          setTimeout(() => {
            if (value === 'invalid') {
              reject(new Error());
            } else {
              resolve(parsedValue);
            }
          }, 1000)
        ),
      {
        ...options,
      }
    );
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');

    const task = sut.result;
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(task).toBeInstanceOf(Promise);
    expect(sut.validator.currentTask).toBeInstanceOf(Promise);

    sut.value = 'valid';
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');

    const task2 = sut.result;
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(task2).toBeInstanceOf(Promise);
    expect(sut.validator.currentTask).toBeInstanceOf(Promise);
    expect(task2).not.toBe(task);

    jest.runAllTimers();
    expect(await task).toBe(parsedValue);
    expect(await task2).toBe(parsedValue);
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
  }
);

test.each(asyncValidatableCases)(
  `Validatable (%s) - result property failure`,
  async (_: string, options: any) => {
    jest.useFakeTimers();
    const errorMessage = 'error message';
    const sut = parsable<string, string>(
      'valid',
      async (value) =>
        new Promise((resolve, reject) =>
          setTimeout(() => {
            if (value === 'invalid') {
              reject(new Error(errorMessage));
            } else {
              resolve('parsed value');
            }
          }, 1000)
        ),
      {
        ...options,
      }
    );
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');

    const task = sut.result;
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(task).toBeInstanceOf(Promise);
    expect(sut.validator.currentTask).toBeInstanceOf(Promise);

    sut.value = 'invalid';
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');

    const task2 = sut.result;
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(task2).toBeInstanceOf(Promise);
    expect(sut.validator.currentTask).toBeInstanceOf(Promise);
    expect(task2).not.toBe(task);

    jest.runAllTimers();
    await expect(task).rejects.toThrowError(VALIDATION_FAILURE);
    await expect(task2).rejects.toThrowError(VALIDATION_FAILURE);
    expect(sut.hasError.value).toBe(true);
    expect(sut.errorMessage.value).toBe(errorMessage);
  }
);

test.each(asyncValidatableCases)(
  `Validatable (%s) - call validate method right after check method inside result property`,
  async (_: string, options: any) => {
    jest.useRealTimers();
    const parsedValue = 'parsed value';
    const sut = parsable<string, string>(
      'invalid',
      async (value) =>
        new Promise((resolve, reject) =>
          setTimeout(() => {
            if (value === 'invalid') {
              reject(new Error());
            } else {
              resolve(parsedValue);
            }
          })
        ),
      {
        ...options,
      }
    );
    const proto = Object.getPrototypeOf(sut.validator);
    const checkSpy = jest.spyOn(proto, 'check');
    // eslint-disable-next-line func-names
    checkSpy.mockImplementationOnce(function (this: AsyncObjectValidator) {
      return checkSpy
        .getMockImplementation()!
        .call(this)
        .catch((err: Error) => {
          sut.value = 'valid';
          sut.validate();
          throw err;
        });
    });

    expect(await sut.result).toBe(parsedValue);

    // eslint-disable-next-line func-names
    checkSpy.mockImplementationOnce(function (this: AsyncObjectValidator) {
      return checkSpy
        .getMockImplementation()!
        .call(this)
        .then(() => {
          sut.value = 'invalid';
          sut.validate();
        });
    });

    sut.validator.reset();
    await expect(sut.result).rejects.toThrowError(VALIDATION_FAILURE);
  }
);
