import { customeAxios } from '../../axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FoundUserType } from './typedef';
import { AxiosError } from 'axios';
import { FindUsersEnum } from 'typedef';

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
