import { AxiosError } from 'axios';
import { ErrorType } from './../../../typedef';
import { AppState } from '../../store/typedef';

export const getPosts = (state: AppState) => state.posts.posts;
export const getPostsLoading = (state: AppState) => state.posts.loading;

export const getPostsError = (state: AppState) => {
	return state.posts.postsError as ErrorType | null;
};

export const getPostError = (state: AppState) => {
	return state.posts.postError as AxiosError | null;
};

export const getCommentError = (state: AppState) => {
	return state.posts.commentError as AxiosError | null;
};
