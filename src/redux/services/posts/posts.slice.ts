import { createSlice } from '@reduxjs/toolkit';
import { loadPost, loadAllPosts } from './actions';
import { PostsStateType } from './typedef';

const initialState: PostsStateType = {
	posts: [],
	loading: false,
	error: null,
};

export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: (bulider) =>
		bulider
			.addCase(loadPost.pending, (state) => {
				state.loading = true;
			})
			.addCase(loadPost.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.selectedPost = payload;
			})
			.addCase(loadAllPosts.pending, (state) => {
				state.loading = true;
			})
			.addCase(loadAllPosts.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.posts = payload;
			}),
});
