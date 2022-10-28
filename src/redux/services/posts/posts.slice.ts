import { createSlice } from '@reduxjs/toolkit';
import {
	loadPosts,
	deletePost,
	likePost,
	unlikePost,
	createComment,
} from './actions';
import { PostsStateType } from './typedef';

const initialState: PostsStateType = {
	posts: [],
	postsLoading: false,
	postsError: null,
	deleteLoading: false,
	deleteError: null,
};

export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		removeDeletePostError(state) {
			state.deleteError = null;
		},
	},
	extraReducers: (bulider) =>
		bulider
			// Load all posts
			.addCase(loadPosts.pending, (state) => {
				state.posts = [];
				state.postsLoading = true;
				state.postsError = null;
			})
			.addCase(loadPosts.fulfilled, (state, { payload }) => {
				state.posts = payload;
				state.postsLoading = false;
				state.postsError = null;
			})
			.addCase(loadPosts.rejected, (state, { payload }) => {
				state.postsLoading = false;
				state.postsError = payload;
			})

			// Delete post
			.addCase(deletePost.pending, (state) => {
				state.deleteLoading = true;
				state.deleteError = null;
			})
			.addCase(deletePost.fulfilled, (state, { meta }) => {
				state.posts = state.posts.filter((item) => item._id !== meta.arg);
				state.deleteLoading = false;
				state.deleteError = null;
			})
			.addCase(deletePost.rejected, (state, { payload }) => {
				state.deleteLoading = false;
				state.deleteError = payload;
			})

			// Like post
			.addCase(likePost.fulfilled, (state, { meta, payload }) => {
				if (payload) {
					const postId = meta.arg;
					const post = state.posts.find((item) => item._id === postId);

					if (post) {
						post.likesCount = post.likesCount + 1;
						post.likesIds.push(payload);
					}
				}
			})

			// Unlike post
			.addCase(unlikePost.fulfilled, (state, { meta, payload }) => {
				if (payload) {
					const postId = meta.arg;
					const post = state.posts.find((item) => item._id === postId);

					if (post) {
						post.likesCount = post.likesCount - 1;
						post.likesIds = post.likesIds.filter((item) => item !== payload);
					}
				}
			})

			.addCase(createComment.pending, (state) => {
				state.postsLoading = true;
				state.postsError = null;
			})

			.addCase(createComment.fulfilled, (state) => {
				state.postsLoading = false;
				state.postsError = null;
			})

			.addCase(createComment.rejected, (state, { payload }) => {
				state.postsLoading = false;
				state.postsError = payload;
			}),
});

export const { removeDeletePostError } = postsSlice.actions;
