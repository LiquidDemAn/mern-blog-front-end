import { createAsyncThunk } from '@reduxjs/toolkit';
import { customeAxios } from '../../axios';

export const loadTags = createAsyncThunk<string[]>(
	'tags/load-tags',
	async () => {
		const { data } = await customeAxios.get('/tags');
		return await data;
	}
);
