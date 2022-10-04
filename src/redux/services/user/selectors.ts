import { AppState } from '../../store/typedef';
import { UserErrorType, UserValidtionErrorType } from './typedef';

export const getIsAuth = (state: AppState) => Boolean(state.user.data);
export const getUser = (state: AppState) => state.user.data;
export const getUserId = (state: AppState) => state.user.data?._id || '';
export const getUserName = (state: AppState) => state.user.data?.fullName;
export const getUserLoading = (state: AppState) => state.user.loading;
// export const getUseNickname = (state: AppState) => state

export const getUserAvatar = (state: AppState) => {
	return state.user.data?.avatarUrl;
};

export const getUserError = (state: AppState) => {
	return state.user.error as UserErrorType | null;
};

export const getUserValidationParams = (state: AppState) => {
	const erros = state.user.validationError as UserValidtionErrorType | null;
	return erros?.data?.map((item) => item.param);
};
