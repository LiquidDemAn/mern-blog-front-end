import { createSlice } from '@reduxjs/toolkit';
import { AuthErrorType, authStateType } from './typedef';
import { loginUser, checkUserAuth, registerUser } from './actions';
import { removeToken } from '../../../local-storage';
import { PathsEnum } from '../../../app/App';

const initialState: authStateType = {
	userData: null,
	loading: false,
	error: null,
	validationError: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logOut(state) {
			state.error = null;
			state.validationError = null;
			state.userData = null;
			removeToken();
			window.location.replace(PathsEnum.Login);
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
				state.userData = payload;
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
				state.userData = payload;
			})
			.addCase(loginUser.rejected, (state, { payload }) => {
				const value = payload as AuthErrorType;

				state.loading = false;
				state.validationError = value.status === 403 ? value : null;
				state.error = value.status !== 403 ? value : null;
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
