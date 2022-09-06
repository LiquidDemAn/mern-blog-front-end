import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { customeAxios } from '../../axios';
import { PostType } from './typedef';

export const loadPosts = createAsyncThunk<PostType[], string>(
	'posts/load-posts',
	async (url, { rejectWithValue }) => {
		try {
			const response = await customeAxios.get(url);
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
