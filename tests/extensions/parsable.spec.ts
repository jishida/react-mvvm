import { parsable, AsyncObjectValidator } from '@jishida/react-mvvm';
import { VALIDATION_FAILURE } from '../utils/constants';
import { getObservableOptionsCases } from '../utils/options';

jest.useRealTimers();

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
  `Validatable (%s) - call validate method right after check method inside result property`,
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
