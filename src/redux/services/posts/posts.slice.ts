import { createSlice } from '@reduxjs/toolkit';
import { loadPosts, deletePost } from './actions';
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
			}),
});

export const { removeDeletePostError } = postsSlice.actions;
