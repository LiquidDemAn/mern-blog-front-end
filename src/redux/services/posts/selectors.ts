import { AppState } from '../../store/typedef';

export const getAllPosts = (state: AppState) => {
	const posts = state.posts.posts;

	return posts.map((post) => {
		return {
			...post,
			createdAt: new Date(post.createdAt).toDateString(),
		};
	});
};
export const getPopularPosts = (state: AppState) => {
	const posts = state.posts.popularPosts;

	return posts.map((post) => {
		return {
			...post,
			createdAt: new Date(post.createdAt).toDateString(),
		};
	});
};

export const getPostsLoading = (state: AppState) => state.posts.loading;
