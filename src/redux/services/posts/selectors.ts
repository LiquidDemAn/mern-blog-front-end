import { AppState } from '../../store/typedef';

export const getAllPosts = (state: AppState) => state.posts.posts;
export const getPost = (state: AppState) => state.posts.selectedPost;
export const getPostsLoading = (state: AppState) => state.posts.loading;
