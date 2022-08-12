import { createSlice } from '@reduxjs/toolkit';
import {
	loadPost,
	loadAllPosts,
	deletePost,
	loadPopularPosts,
} from './actions';
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
			// load single post
			.addCase(loadPost.pending, (state) => {
				state.loading = true;
			})
			.addCase(loadPost.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.selectedPost = payload;
			})
			.addCase(loadPost.rejected, (state, { payload }: any) => {
				state.loading = false;
				state.posts = [];
				state.error = payload;
			})

			// Load all posts
			.addCase(loadAllPosts.pending, (state) => {
				state.loading = true;
			})
			.addCase(loadAllPosts.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.posts = payload;
			})

			// Load popular posts
			.addCase(loadPopularPosts.pending, (state) => {
				state.loading = true;
			})
			.addCase(loadPopularPosts.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.popularPosts = payload;
			})

			// Delete post
			.addCase(deletePost.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deletePost.fulfilled, (state, { meta }) => {
				state.posts = state.posts.filter((item) => item._id !== meta.arg);
				state.selectedPost = null;
				state.loading = false;
				state.error = null;
			}),
});

// export const {} = postsSlice.reducer;
