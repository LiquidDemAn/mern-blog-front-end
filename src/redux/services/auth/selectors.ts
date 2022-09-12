import { AppState } from './../../store/typedef';
import { AuthErrorType, AuthValidtionErrorType } from './typedef';

export const getIsAuth = (state: AppState) => Boolean(state.auth.userData);
export const getUser = (state: AppState) => state.auth.userData;
export const getUserId = (state: AppState) => state.auth.userData?._id;
export const getAuthLoading = (state: AppState) => state.auth.loading;

export const getAuthError = (state: AppState) => {
	return state.auth.error as AuthErrorType | null;
};

export const getAuthValidationParams = (state: AppState) => {
	const erros = state.auth.validationError as AuthValidtionErrorType | null;
	return erros?.data?.map((item) => item.param);
};
