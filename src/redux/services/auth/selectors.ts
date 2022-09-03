import { AppState } from './../../store/typedef';
import { AuthErrorType, AuthValidtionErrorType } from './typedef';

export const getIsAuth = (state: AppState) => Boolean(state.auth.userData);
export const getUser = (state: AppState) => state.auth.userData;
export const getAuthLoading = (state: AppState) => state.auth.loading;

export const getAuthError = (state: AppState) => {
	return state.auth.error as AuthErrorType | null;
};

export const getAuthValidationError = (state: AppState) => {
	return state.auth.validationError as AuthValidtionErrorType | null;
};
