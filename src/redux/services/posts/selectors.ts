import { AppState } from '../../store/typedef';

export const getAllPosts = (state: AppState) => state.posts.posts;
export const getPostsLoading = (state: AppState) => state.posts.loading;
export const getPostsError = (state: AppState) => state.posts.error;
