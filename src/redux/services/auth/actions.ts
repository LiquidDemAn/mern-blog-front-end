import { customeAxios } from './../../axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userDataType, loginType } from './typedef';

export const loginUser = createAsyncThunk<userDataType, loginType>(
	'auth/login',
	async (params) => {
		const { data } = await customeAxios.post('/auth/login', params);
		return data;
	}
);
