import { customeAxios } from 'redux/axios';
import { UserType } from 'api/models/UserType';

export const getUserByNickNameApi = async (nickName?: string) => {
  const { data } = await customeAxios.get<UserType>(`/users/${nickName}`);
  return data;
};
