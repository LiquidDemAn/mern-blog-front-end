import { createSlice } from '@reduxjs/toolkit';
import { authStateType } from './typedef';
import { loginUser } from './actions';

const initialState: authStateType = {
	userData: null,
	loading: false,
	error: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logOut(state) {
			state.error = null;
			state.userData = null;
		},
	},
	extraReducers: (bulider) =>
		bulider
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.error = null;
				state.userData = payload;
			})
			.addCase(loginUser.rejected, (state) => {
				state.loading = true;
				state.error = null;
			}),
});

export const { logOut } = authSlice.actions;
