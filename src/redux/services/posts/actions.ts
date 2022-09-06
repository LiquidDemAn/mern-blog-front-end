import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { customeAxios } from '../../axios';
import { PostType } from './typedef';

export const loadAllPosts = createAsyncThunk<PostType[]>(
	'posts/load-all-posts',
	async (_, { rejectWithValue }) => {
		try {
			const response = await customeAxios.get('/posts');
			return await response.data;
		} catch (err) {
			const error = err as AxiosError;

			return rejectWithValue({
				status: error.response?.status,
				message: error.message,
			});
		}
	}
);

export const loadPopularPosts = createAsyncThunk<PostType[]>(
	'posts/load-popular-posts',
	async (_, { rejectWithValue }) => {
		try {
			const response = await customeAxios.get('/posts/popular');
			return await response.data;
		} catch (err) {
			const error = err as AxiosError;

			return rejectWithValue({
				status: error.response?.status,
				message: error.message,
			});
		}
	}
);

export const loadPostsByTag = createAsyncThunk<PostType[], string>(
	'posts/load-posts-by-tag',
	async (tag) => {
		const response = await customeAxios.get(`/posts/tags/${tag}`);
		return await response.data;
	}
);

export const loadPopularPostsByTag = createAsyncThunk<PostType[], string>(
	'posts/load-popular-posts-by-tag',
	async (tag) => {
		const response = await customeAxios.get(`/posts/tags/${tag}/popular`);
		return await response.data;
	}
);

export const deletePost = createAsyncThunk(
	'posts/delete-post',
	async (id: string, { rejectWithValue }) => {
		try {
			await customeAxios.delete(`/posts/${id}`);
		} catch (err) {
			const error = err as AxiosError;

			return rejectWithValue({
				status: error.response?.status,
				message: error.message,
			});
		}
	}
);
