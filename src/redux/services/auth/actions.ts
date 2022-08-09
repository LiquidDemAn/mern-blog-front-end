import { customeAxios } from './../../axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userDataType, loginType, registerType } from './typedef';
import { setToken } from '../../../local-storage';

export const checkUserAuth = createAsyncThunk<userDataType>(
	'auth/check-auth',
	async () => {
		const response = await customeAxios.get('/auth/me');
		return response.data;
	}
);

export const loginUser = createAsyncThunk<userDataType, loginType>(
	'auth/login',
	async (params) => {
		const response = await customeAxios.post('/auth/login', params);
		const data = response.data as userDataType;

		if (data.token) {
			setToken(data.token);
		}

		return data;
	}
);

export const registerUser = createAsyncThunk<userDataType, registerType>(
	'auth/register',
	async (params) => {
		const response = await customeAxios.post('/auth/register', params);
		const data = response.data as userDataType;

		if (data.token) {
			setToken(data.token);
		}

		return data;
	}
);
