import { createSlice } from '@reduxjs/toolkit';
import { UserErrorType, UserStateType } from './typedef';
import { loginUser, checkUserAuth, registerUser } from './actions';
import { removeToken } from '../../../local-storage';
import { PathsEnum } from '../../../typedef';

const initialState: UserStateType = {
	data: null,
	loading: false,
	error: null,
	validationError: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logOut(state) {
			state.error = null;
			state.validationError = null;
			state.data = null;
			removeToken();
			window.location.replace(PathsEnum.Login);
		},
		resetErrors(state) {
			state.error = null;
			state.validationError = null;
		},
	},
	extraReducers: (bulider) =>
		bulider
			// CheckAuth
			.addCase(checkUserAuth.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.validationError = null;
			})
			.addCase(checkUserAuth.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.error = null;
				state.validationError = null;
				state.data = payload;
			})
			.addCase(checkUserAuth.rejected, (state) => {
				state.loading = false;
				state.error = null;
				state.validationError = null;
			})

			//Login
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.validationError = null;
			})
			.addCase(loginUser.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.error = null;
				state.data = payload;
			})
			.addCase(loginUser.rejected, (state, { payload }) => {
				const value = payload as UserErrorType;

				state.loading = false;
				state.validationError = value.status === 403 ? value : null;
				state.error = value.status !== 403 ? value : null;
			})

			// Register
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.validationError = null;
			})
			.addCase(registerUser.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.error = null;
				state.validationError = null;
				state.data = payload;
			})
			.addCase(registerUser.rejected, (state, { payload }) => {
				const value = payload as UserErrorType;

				state.loading = false;
				state.validationError = value.status === 403 ? value : null;
				state.error = value.status !== 403 ? value : null;
			}),
});

export const { logOut, resetErrors } = userSlice.actions;
