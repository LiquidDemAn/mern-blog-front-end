import { AppState } from '../../store/typedef';
import { UserErrorType, UserValidtionErrorType } from './typedef';

export const getUserError = (state: AppState) => {
  return state.user.error as UserErrorType | null;
};

export const getUserValidationParams = (state: AppState) => {
  const erros = state.user.validationError as UserValidtionErrorType | null;
  return erros?.data?.map((item) => item.param);
};
