import { customeAxios } from './../../axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userDataType, loginType, registerType } from './typedef';
import { setToken } from '../../../local-storage';
import { AxiosError } from 'axios';

export const checkUserAuth = createAsyncThunk<userDataType>(
	'auth/check-auth',
	async () => {
		const response = await customeAxios.get('/auth/me');
		return response.data;
	}
);

export const loginUser = createAsyncThunk<userDataType, loginType>(
	'auth/login',
	async (params, { rejectWithValue }) => {
		try {
			const response = await customeAxios.post('/auth/login', params);
			const data = response.data;

			if (data.token) {
				setToken(data.token);
			}

			return data;
		} catch (err: unknown) {
			const error = err as AxiosError;

			console.log(error);

			return rejectWithValue({
				data: error.response?.data,
				status: error.response?.status,
			});
		}
	}
);

export const registerUser = createAsyncThunk<userDataType, registerType>(
	'auth/register',
	async (params) => {
		const avatar = params.avatarUrl;

		if (avatar) {
			const { data } = await customeAxios.post('/upload/avatar', { avatar });
			params.avatarUrl = data.url;
		}

		const response = await customeAxios.post('/auth/register', params);
		const data = response.data as userDataType;

		if (data.token) {
			setToken(data.token);
		}

		return data;
	}
);
