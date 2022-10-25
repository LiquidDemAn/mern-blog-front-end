import { customeAxios } from '../../axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	UserDataType,
	LoginType,
	RegisterType,
	FollowerType,
	FoundUserType,
} from './typedef';
import { setToken } from '../../../local-storage';
import { AxiosError } from 'axios';
import { FindUsersEnum } from '../../../typedef';

export const checkUserAuth = createAsyncThunk<UserDataType>(
	'user/check-auth',
	async () => {
		const { data } = await customeAxios.get('/auth/me');
		return data;
	}
);

export const loadUser = createAsyncThunk<
	void,
	{
		nickName: string;
		setUser: (value: UserDataType) => void;
		setProfileError: (error: AxiosError) => void;
	}
>('user/load-user', async ({ nickName, setUser, setProfileError }) => {
	try {
		const { data } = await customeAxios.get(`/users/${nickName}`);

		setUser(data);
	} catch (err) {
		const error = err as AxiosError;
		setProfileError(error);
	}
});

export const loginUser = createAsyncThunk<UserDataType, LoginType>(
	'user/login',
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

export const registerUser = createAsyncThunk<UserDataType, RegisterType>(
	'user/register',
	async (params, { rejectWithValue }) => {
		try {
			const avatar = params.avatarUrl;

			if (avatar) {
				const { data } = await customeAxios.post('/upload/avatar', { avatar });
				params.avatarUrl = data.url;
			}

			const response = await customeAxios.post('/auth/register', params);
			const data = response.data as UserDataType;

			if (data.token) {
				setToken(data.token);
			}

			return data;
		} catch (err) {
			const error = err as AxiosError;

			return rejectWithValue({
				data: error.response?.data,
				status: error.response?.status,
			});
		}
	}
);

export const follow = createAsyncThunk<FollowerType | undefined, string>(
	'user/follow',
	async (id, { rejectWithValue }) => {
		try {
			const response = await customeAxios.patch(`/user/follow/${id}`);
			return response.data;
		} catch (err) {
			const error = err as AxiosError;

			return rejectWithValue({
				data: error.response?.data,
				status: error.response?.status,
			});
		}
	}
);

export const unFollow = createAsyncThunk<string | undefined, string>(
	'user/unFollow',
	async (id, { rejectWithValue }) => {
		try {
			await customeAxios.patch(`/user/unfollow/${id}`);
			return id;
		} catch (err) {
			const error = err as AxiosError;

			return rejectWithValue({
				data: error.response?.data,
				status: error.response?.status,
			});
		}
	}
);

export const findUsers = createAsyncThunk<
	void,
	{
		selectValue: FindUsersEnum;
		value: string;
		setData: (data: FoundUserType[] | null) => void;
		setLoading: (value: boolean) => void;
		setError: (error: AxiosError) => void;
	}
>(
	'user/find-users',
	async ({ selectValue, value, setData, setLoading, setError }) => {
		try {
			if (selectValue === FindUsersEnum.NickName) {
				const { data } = await customeAxios.get(
					`/users/findByNickName/${value}`
				);

				setData(data);
			} else {
				const { data } = await customeAxios.get(
					`/users/findByFullName/${value}`
				);

				setData(data);
			}

			setLoading(false);
		} catch (err) {
			console.log(err);

			setError(err as AxiosError);
			setLoading(false);
		}
	}
);
