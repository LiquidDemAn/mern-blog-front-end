import { AppState } from './../../store/typedef';
import { AuthErrorType, AuthValidtionErrorType } from './typedef';

export const getIsAuth = (state: AppState) => Boolean(state.auth.userData);
export const getUser = (state: AppState) => state.auth.userData;
export const getUserId = (state: AppState) => state.auth.userData?._id;
export const getAuthLoading = (state: AppState) => state.auth.loading;

export const getAuthError = (state: AppState) => {
	return state.auth.error as AuthErrorType | null;
};

export const getAuthValidationError = (state: AppState) => {
	const test = state.auth.validationError as AuthValidtionErrorType | null;
	const qq = test?.data;
	const ww = qq?.map((item) => item.param);
	console.log(ww);
	return state.auth.validationError as AuthValidtionErrorType | null;
};

export const getAuthValidationParams = (state: AppState) => {
	const erros = state.auth.validationError as AuthValidtionErrorType | null;
	const data = erros?.data;
	const params = data?.map((item) => item.param);
	console.log(params);

	return params;
};
