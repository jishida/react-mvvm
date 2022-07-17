import { parsable } from '@jishida/react-mvvm';
import { VALIDATION_FAILURE } from '../utils/constants';
import { getObservableOptionsCases } from '../utils/options';

jest.useFakeTimers();

const asyncValidatableCases = getObservableOptionsCases().filter(
  (c) => c[0].split(':').includes('parsable') && (c[1] as any).async
);

test.each(asyncValidatableCases)(
  `Validatable (%s) - result property success`,
  async (_: string, options: any) => {
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
