import { customeAxios } from 'redux/axios';
import { UserDataType } from 'contexts/types';

export const getSelfApi = async () => {
  const { data } = await customeAxios.get<UserDataType>('/auth/me');
  return data;
};
