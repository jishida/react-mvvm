import { validatable } from '@jishida/react-mvvm';
import { getObservableOptionsCases } from '../utils/options';
import { VALIDATION_FAILURE } from '../utils/constants';

jest.useFakeTimers();

const asyncValidatableCases = getObservableOptionsCases()
  .filter(
    (c) =>
      c[0].split(':').includes('validatable') &&
      (c[1] as any).result &&
      (c[1] as any).async
  )
  .map((c) => [c[0], c[1]] as [string, any]);

test.each(asyncValidatableCases)(
  `Validatable (%s) - result property success`,
  async (_: string, options: any) => {
    const sut = validatable<string>(
      'invalid',
      async (value: string) =>
        new Promise((resolve, reject) =>
          setTimeout(() => {
            if (value === 'invalid') {
              reject(new Error());
            } else {
              resolve(true);
            }
          }, 1000)
        ),
      {
        ...options,
      }
    );
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');

    const task1 = sut.result;
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(task1).toBeInstanceOf(Promise);
    expect(sut.validator.currentTask).toBeInstanceOf(Promise);

    sut.value = 'valid';
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');

    const task2 = sut.result;
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(task2).toBeInstanceOf(Promise);
    expect(sut.validator.currentTask).toBeInstanceOf(Promise);
    expect(task2).not.toBe(task1);

    jest.runAllTimers();
    expect(await task1).toBe('valid');
    expect(await task2).toBe('valid');
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
  }
);

test.each(asyncValidatableCases)(
  `Validatable (%s) - result property failure`,
  async (_: string, options: any) => {
    const errorMessage = 'error message';
    const sut = validatable<string>(
      'valid',
      async (value: string) =>
        new Promise((resolve, reject) =>
          setTimeout(() => {
            if (value === 'invalid') {
              reject(new Error(errorMessage));
            } else {
              resolve(true);
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
