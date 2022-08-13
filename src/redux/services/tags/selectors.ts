import { ErrorType } from './../../../typedef';
import { AppState } from '../../store/typedef';

export const getTags = (state: AppState) => state.tags.tags;
export const getTagsLoading = (state: AppState) => state.tags.loading;

export const getTagsError = (state: AppState) => {
	return state.tags.error as ErrorType | null;
};
