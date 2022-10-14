import { createSlice } from '@reduxjs/toolkit';
import { UserErrorType, UserStateType } from './typedef';
import {
	loginUser,
	checkUserAuth,
	registerUser,
	follow,
	unFollow,
} from './actions';
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
			})

			// follow
			.addCase(follow.pending, (state) => {
				state.error = null;
			})
			.addCase(follow.fulfilled, (state, { payload, meta }) => {
				state.error = null;

				if (payload) {
					state.data?.following.push(payload);
				}
			})
			.addCase(follow.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
			})

			// unFollow
			.addCase(unFollow.pending, (state) => {
				state.error = null;
			})
			.addCase(unFollow.fulfilled, (state, { payload, meta }) => {
				state.error = null;

				if (payload && state.data?.following) {
					state.data.following = state.data?.following.filter(
						(item) => item._id !== payload
					);
				}
			})
			.addCase(unFollow.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
			}),
});

export const { logOut, resetErrors } = userSlice.actions;
