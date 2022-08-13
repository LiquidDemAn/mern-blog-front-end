import { PostType } from './typedef';
import { AppState } from '../../store/typedef';

export const getAllPosts = (state: AppState) => {
	const posts = state.posts.posts;

	const data: PostType[] = posts.map((post) => {
		return {
			...post,
			createdAt: new Date(post.createdAt).toDateString(),
		};
	});

	return data;
};
export const getPopularPosts = (state: AppState) => {
	const posts = state.posts.popularPosts;

	const data: PostType[] = posts.map((post) => {
		return {
			...post,
			createdAt: new Date(post.createdAt).toDateString(),
		};
	});

	return data;
};

export const getPostsLoading = (state: AppState) => state.posts.loading;
export const getPostsError = (state: AppState) => state.posts.error;
