import { serverErrorText } from 'utils/constants';

export const getErrorMessage = (errorCode?: string) => {
  const firstLine =
    errorCode !== 'not_found_user' ? serverErrorText + '\n' : '';

  return errorCode ? firstLine : null;
};
