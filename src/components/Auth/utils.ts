import { AuthRequestType } from 'components/Auth/types';
import { ErrorsCodes } from 'typedef';
import { serverErrorText } from 'utils/constants';

export const getAuthErrorText = (
  type?: AuthRequestType,
  code?: ErrorsCodes
) => {
  switch (type) {
    case AuthRequestType.LOGIN:
      if (code === ErrorsCodes.NOT_FOUND_USER) {
        return 'User not found by this email!';
      } else if (code === ErrorsCodes.INVALID_CREDENTIALS) {
        return 'Login or password do not match!';
      } else {
        return serverErrorText;
      }

    case AuthRequestType.REGISTER:
      if (code === ErrorsCodes.EMAIL_RESERVED) {
        return 'Email already in use!';
      } else {
        return serverErrorText;
      }
    default:
      return serverErrorText;
  }
};
