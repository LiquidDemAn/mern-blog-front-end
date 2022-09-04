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
	loading: false,
	deleteLoading: false,
	error: null,
	deleteError: null,
};

export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: (bulider) =>
		bulider
			// Load all posts
			.addCase(loadAllPosts.pending, (state) => {
				state.posts = [];
				state.loading = true;
				state.error = null;
			})
			.addCase(loadAllPosts.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.posts = payload;
			})

			// Load popular posts
			.addCase(loadPopularPosts.pending, (state) => {
				state.posts = [];
				state.loading = true;
				state.error = null;
			})
			.addCase(loadPopularPosts.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.posts = payload;
			})
			.addCase(loadPopularPosts.rejected, (state, { payload }) => {
				state.loading = false;
			})

			// Load posts by tag
			.addCase(loadPostsByTag.pending, (state) => {
				state.posts = [];
				state.loading = true;
				state.error = null;
			})
			.addCase(loadPostsByTag.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.posts = payload;
			})
			.addCase(loadPostsByTag.rejected, (state, { payload }) => {
				state.loading = false;
			})

			// Load popular posts by tag
			.addCase(loadPopularPostsByTag.pending, (state) => {
				state.posts = [];
				state.loading = true;
				state.error = null;
			})
			.addCase(loadPopularPostsByTag.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.posts = payload;
			})
			.addCase(loadPopularPostsByTag.rejected, (state, { payload }) => {
				state.loading = false;
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

// export const {} = postsSlice.reducer;
