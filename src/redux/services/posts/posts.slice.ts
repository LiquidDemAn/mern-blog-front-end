import { createSlice } from '@reduxjs/toolkit';
import {
	loadAllPosts,
	deletePost,
	loadPopularPosts,
	loadPostsByTag,
	loadPopularPostsByTag,
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
			.addCase(loadAllPosts.pending, (state) => {
				state.posts = [];
				state.postsLoading = true;
				state.postsError = null;
			})
			.addCase(loadAllPosts.fulfilled, (state, { payload }) => {
				state.postsLoading = false;
				state.posts = payload;
			})
			.addCase(loadAllPosts.rejected, (state, { payload }) => {
				state.postsLoading = false;
				state.postsError = payload;
			})

			// Load popular posts
			.addCase(loadPopularPosts.pending, (state) => {
				state.posts = [];
				state.postsLoading = true;
				state.postsError = null;
			})
			.addCase(loadPopularPosts.fulfilled, (state, { payload }) => {
				state.postsLoading = false;
				state.posts = payload;
			})
			.addCase(loadPopularPosts.rejected, (state, { payload }) => {
				state.postsLoading = false;
				state.postsError = payload;
			})

			// Load posts by tag
			.addCase(loadPostsByTag.pending, (state) => {
				state.posts = [];
				state.postsLoading = true;
				state.postsError = null;
			})
			.addCase(loadPostsByTag.fulfilled, (state, { payload }) => {
				state.postsLoading = false;
				state.posts = payload;
			})
			.addCase(loadPostsByTag.rejected, (state, { payload }) => {
				state.postsLoading = false;
			})

			// Load popular posts by tag
			.addCase(loadPopularPostsByTag.pending, (state) => {
				state.posts = [];
				state.postsLoading = true;
				state.postsError = null;
			})
			.addCase(loadPopularPostsByTag.fulfilled, (state, { payload }) => {
				state.postsLoading = false;
				state.posts = payload;
			})
			.addCase(loadPopularPostsByTag.rejected, (state, { payload }) => {
				state.postsLoading = false;
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
			}),
});

export const { removeDeletePostError } = postsSlice.actions;
