import { createSlice } from '@reduxjs/toolkit';
import { authStateType } from './typedef';
import { loginUser, checkUserAuth, registerUser } from './actions';

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
			window.localStorage.removeItem('token');
		},
	},
	extraReducers: (bulider) =>
		bulider
			//Login
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
			})

			// CheckAuth
			.addCase(checkUserAuth.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(checkUserAuth.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.error = null;
				state.userData = payload;
			})
			.addCase(checkUserAuth.rejected, (state) => {
				state.loading = true;
				state.error = null;
			})

			// Register
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.error = null;
				state.userData = payload;
			})
			.addCase(registerUser.rejected, (state) => {
				state.loading = true;
				state.error = null;
			}),
});

export const { logOut } = authSlice.actions;
