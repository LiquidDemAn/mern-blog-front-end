import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { customeAxios } from '../../axios';
import { PostType } from './typedef';
import { AuthStateType } from '../auth/typedef';

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

export const likePost = createAsyncThunk<string | undefined, string>(
	'posts/like-post',
	async (id, { getState }) => {
		const { auth } = getState() as { auth: AuthStateType };
		const userId = auth.userData?._id;

		try {
			await customeAxios.patch(`/posts/${id}/like`);
			return userId;
		} catch (err) {
			console.log(err);
		}
	}
);

export const unlikePost = createAsyncThunk<string | undefined, string>(
	'posts/unlike-post',
	async (id, { getState }) => {
		const { auth } = getState() as { auth: AuthStateType };
		const userId = auth.userData?._id;

		try {
			await customeAxios.patch(`/posts/${id}/unlike`);
			return userId;
		} catch (err) {
			console.log(err);
		}
	}
);
