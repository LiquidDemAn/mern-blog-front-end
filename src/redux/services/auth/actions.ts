import { customeAxios } from './../../axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userDataType, loginInfoType } from './typedef';

export const loginUser = createAsyncThunk<userDataType, loginInfoType>(
	'auth/login',
	async (params) => {
		const { data } = await customeAxios.post('/auth/login', params);
		return data;
	}
);
