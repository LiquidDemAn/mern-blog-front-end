import { customeAxios } from './../../axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userDataType, loginType } from './typedef';

export const loginUser = createAsyncThunk<userDataType, loginType>(
	'auth/login',
	async (params) => {
		const response = await customeAxios.post('/auth/login', params);
		const data = response.data as userDataType;

		if (data.token) {
			window.localStorage.setItem('token', data.token);
		}

		return data;
	}
);

export const checkUserAuth = createAsyncThunk<userDataType>(
	'auth/check-user-auth',
	async () => {
		const response = await customeAxios.get('/auth/me');
		return response.data;
	}
);
