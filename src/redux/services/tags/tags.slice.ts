import { loadTags } from './actions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TagsStateType } from './typedef';

const initialState: TagsStateType = {
	tags: [],
	loading: false,
	error: null,
};

export const tagsSlice = createSlice({
	name: 'tags',
	initialState,
	reducers: {},
	extraReducers: (bulider) =>
		bulider
			.addCase(loadTags.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loadTags.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.tags = payload;
			})
			.addCase(loadTags.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
			}),
});
