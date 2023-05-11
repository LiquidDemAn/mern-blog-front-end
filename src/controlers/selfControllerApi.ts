import { customeAxios } from 'redux/axios';
import { LoginType, UserDataType } from 'contexts/types';

export const getSelfApi = async () => {
  const { data } = await customeAxios.get<UserDataType>('/auth/me');
  return data;
};

export const loginApi = async (params: LoginType) => {
  const { data } = await customeAxios.post<UserDataType & { token: string }>(
    '/auth/login',
    params
  );
  return data;
};
