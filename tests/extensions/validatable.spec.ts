import { validatable } from '@jishida/react-mvvm';
import { getObservableOptionsCases } from '../utils/options';

const validatableCases = getObservableOptionsCases().filter((c) =>
  c[0].split(':').includes('validatable')
);

const syncValidatableCases = validatableCases.filter(
  (c) => !(c[1] as any).async
);

const asyncValidatableCases = validatableCases.filter(
  (c) => (c[1] as any).async
);

test.each(syncValidatableCases)(
  `Validatable (%s) - validate func returns true`,
  (_: string, options: any) => {
    const sut = validatable('init', () => true, { ...options });
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(sut.validate()).toBe(true);
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
  }
);

test.each(asyncValidatableCases)(
  `Validatable (%s) - validate func returns true`,
  async (_: string, options: any) => {
    const sut = validatable('init', async () => true, {
      ...options,
    });
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(await sut.validate()).toBe(true);
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
  }
);

test.each(syncValidatableCases)(
  `Validatable (%s) - validate func returns false`,
  (_: string, options: any) => {
    const sut = validatable('init', () => false, { ...options });
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(sut.validate()).toBe(false);
    expect(sut.hasError.value).toBe(true);
    expect(sut.errorMessage.value).toBe('');
  }
);

test.each(asyncValidatableCases)(
  `Validatable (%s) - validate func returns false`,
  async (_: string, options: any) => {
    const sut = validatable('init', async () => false, { ...options });
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(await sut.validate()).toBe(false);
    expect(sut.hasError.value).toBe(true);
    expect(sut.errorMessage.value).toBe('');
  }
);

test.each(syncValidatableCases)(
  `Validatable (%s) - validate func returns void`,
  (_: string, options: any) => {
    const sut = validatable('init', () => {}, { ...options });
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(sut.validate()).toBe(true);
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
  }
);

test.each(asyncValidatableCases)(
  `Validatable (%s) - validate func returns void`,
  async (_: string, options: any) => {
    const sut = validatable('init', async () => {}, { ...options });
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
    expect(await sut.validate()).toBe(true);
    expect(sut.hasError.value).toBe(false);
    expect(sut.errorMessage.value).toBe('');
  }
);
