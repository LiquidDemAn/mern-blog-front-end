import { customeAxios } from 'redux/axios';
import { LoginType, RegisterType } from 'components/Auth/types';
import { setToken } from 'local-storage';
import { UserType } from 'api/models/UserType';

const baseUrl = 'auth/';

export const getSelfApi = async () => {
  const { data } = await customeAxios.get<UserType>(`${baseUrl}me`);
  return data;
};

export const loginApi = async (params: LoginType) => {
  const { data } = await customeAxios.post<string>(`${baseUrl}login`, params);
  return data;
};

export const registerApi = async (params: RegisterType) => {
  const avatar = params.avatarUrl;

  if (avatar) {
    const { data } = await customeAxios.post('upload/avatar', { avatar });
    params.avatarUrl = data;
  }

  const { data } = await customeAxios.post<string>(
    `${baseUrl}register`,
    params
  );

  if (data) {
    setToken(data);
  }

  return data;
};
