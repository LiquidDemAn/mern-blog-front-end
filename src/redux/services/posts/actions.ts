import { createAsyncThunk } from '@reduxjs/toolkit';
import { customeAxios } from '../../axios';
import { PostType } from './typedef';

export const loadPost = createAsyncThunk<PostType, string>(
	'posts/load-post',
	async (id) => {
		const response = await customeAxios.get(`/posts/${id}`);
		return await response.data;
	}
);
