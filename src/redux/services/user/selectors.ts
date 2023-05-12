import { AppState } from '../../store/typedef';
import { UserErrorType } from './typedef';

export const getUserError = (state: AppState) => {
  return state.user.error as UserErrorType | null;
};
