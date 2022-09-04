import { AppState } from '../../store/typedef';

export const getAllPosts = (state: AppState) => state.posts.posts;
export const getPostsLoading = (state: AppState) => state.posts.loading;
export const getPostsError = (state: AppState) => state.posts.error;
export const getDeletePostError = (state: AppState) => state.posts.deleteError;
export const getDeletePostLoading = (state: AppState) => {
	return state.posts.deleteLoading;
};
