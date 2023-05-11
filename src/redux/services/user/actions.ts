import { customeAxios } from '../../axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserDataType, FoundUserType } from './typedef';
import { AxiosError } from 'axios';
import { FindUsersEnum } from 'typedef';
import { FollowerType } from 'api/models/FollowerType';

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
        status: error.response?.status
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
