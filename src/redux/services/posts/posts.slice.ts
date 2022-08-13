import { createSlice } from '@reduxjs/toolkit';
import { loadAllPosts, deletePost, loadPopularPosts } from './actions';
import { PostsStateType } from './typedef';

const initialState: PostsStateType = {
	posts: [],
	popularPosts: [],
	loading: false,
	error: null,
};

export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: (bulider) =>
		bulider
			// Load all posts
			.addCase(loadAllPosts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loadAllPosts.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.posts = payload;
			})

			// Load popular posts
			.addCase(loadPopularPosts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loadPopularPosts.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.popularPosts = payload;
			})
			.addCase(loadPopularPosts.rejected, (state, { payload }) => {
				state.loading = false;
			})

			// Delete post
			.addCase(deletePost.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deletePost.fulfilled, (state, { meta }) => {
				state.posts = state.posts.filter((item) => item._id !== meta.arg);
				state.loading = false;
				state.error = null;
			}),
});

// export const {} = postsSlice.reducer;
