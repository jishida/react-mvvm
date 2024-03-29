import { validatable, AsyncObjectValidator } from '@jishida/react-mvvm';
import { getObservableOptionsCases } from '../utils/options';
import { VALIDATION_FAILURE } from '../utils/constants';

jest.useRealTimers();

const validatableCases = getObservableOptionsCases()
  .filter(
    (c) => c[0].split(':').includes('validatable') && (c[1] as any).result
  )
  .map((c) => [c[0], c[1]] as [string, any]);

const syncValidatableCases = validatableCases.filter(
  (c) => !(c[1] as any).async
);

const asyncValidatableCases = validatableCases.filter(
  (c) => (c[1] as any).async
);

test.each(syncValidatableCases)(
  `Validatable (%s) - result property returns value if validation succeeds`,
  (_: string, options: any) => {
    const initialValue = 'initial value';
    const validateFn = jest.fn(() => {});
    const sut = validatable(initialValue, validateFn, { ...options });
    expect(sut.result).toBe(initialValue);
    expect(validateFn).toBeCalledTimes(1);
  }
);

test.each(asyncValidatableCases)(
  `Validatable (%s) - result property returns value if validation succeeds`,
  async (_: string, options: any) => {
    const initialValue = 'initial value';
    const validateFn = jest.fn(async () => {});
    const sut = validatable(initialValue, validateFn, { ...options });
    expect(await sut.result).toBe(initialValue);
    expect(validateFn).toBeCalledTimes(1);
  }
);

test.each(syncValidatableCases)(
  `Validatable (%s) - result property returns value if validation fails`,
  (_: string, options: any) => {
    const validateFn = jest.fn(() => {
      throw new Error();
    });
    const sut = validatable('', validateFn, { ...options });
    expect(() => sut.result).toThrowError(VALIDATION_FAILURE);
    expect(validateFn).toBeCalledTimes(1);
  }
);

test.each(asyncValidatableCases)(
  `Validatable (%s) - result property returns value if validation fails`,
  async (_: string, options: any) => {
    const validateFn = jest.fn(async () => {
      throw new Error();
    });
    const sut = validatable('', validateFn, { ...options });
    await expect(() => sut.result).rejects.toThrowError(VALIDATION_FAILURE);
    expect(validateFn).toBeCalledTimes(1);
  }
);

test.each(asyncValidatableCases)(
  `Validatable (%s) - call validate method right after check method inside result property`,
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

    expect(await sut.result).toBe('valid');

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
