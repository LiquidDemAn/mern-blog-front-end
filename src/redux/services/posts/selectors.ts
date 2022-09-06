import { ErrorType } from './../../../typedef';
import { AppState } from '../../store/typedef';

export const getAllPosts = (state: AppState) => state.posts.posts;
export const getPostsLoading = (state: AppState) => state.posts.postsLoading;
export const getPostsError = (state: AppState) => state.posts.postsError;

export const getDeletePostError = (state: AppState) => {
	return state.posts.deleteError as ErrorType | null;
};

export const getDeletePostLoading = (state: AppState) => {
	return state.posts.deleteLoading;
};
