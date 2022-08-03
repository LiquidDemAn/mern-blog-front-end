import { createAsyncThunk } from '@reduxjs/toolkit';
import { customeAxios } from '../../axios';

export const loadTags = createAsyncThunk<string[]>(
	'tags/load-tags',

	async (_, { rejectWithValue }) => {
		try {
			const { data } = await customeAxios.get('/tags');
			return data;
		} catch (err: any) {
			return rejectWithValue(err.response.data);
		}
	}
);
