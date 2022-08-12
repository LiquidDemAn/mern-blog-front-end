import { createAsyncThunk } from '@reduxjs/toolkit';
import { customeAxios } from '../../axios';
import { PostType } from './typedef';

export const loadAllPosts = createAsyncThunk<PostType[]>(
	'posts/load-all-posts',
	async () => {
		const response = await customeAxios.get('/posts');
		return await response.data;
	}
);

export const loadPopularPosts = createAsyncThunk<PostType[]>(
	'posts/load-popular-posts',
	async () => {
		const response = await customeAxios.get('/posts/popular');
		return await response.data;
	}
);

export const deletePost = createAsyncThunk(
	'posts/delete-post',
	async (id: string) => {
		await customeAxios.delete(`/posts/${id}`);
	}
);
