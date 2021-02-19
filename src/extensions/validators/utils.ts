export function _isValidationOptionsKey(name: string) {
  return ['enabled', 'strategy', 'parent', 'delay', 'lazy'].indexOf(name) >= 0;
}

export function _getErrorMessage(err: any) {
  return err instanceof Error
    ? err.message
    : typeof err === 'string'
    ? err
    : '';
}

export const VALIDATION_FAILURE = 'Validation failure';
