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

export const getPost = (state: AppState) => {
	const post = state.posts.selectedPost;

	if (post) {
		return {
			...post,
			createdAt: new Date(post.createdAt).toUTCString(),
		};
	}
};

export const getPostsLoading = (state: AppState) => state.posts.loading;
