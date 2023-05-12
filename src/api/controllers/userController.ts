import { customeAxios } from 'redux/axios';
import {
  FindUsersEnum,
  SearchingUsersRequest,
  SearchingUserType,
  UserType
} from 'api/models/UserType';

export const getUserByNickNameApi = async (nickName?: string) => {
  const { data } = await customeAxios.get<UserType>(`/users/${nickName}`);
  return data;
};

export const searchUsersApi = async (params: SearchingUsersRequest) => {
  const { searchType, value } = params;

  const { data } = await customeAxios.get<SearchingUserType[]>(
    searchType === FindUsersEnum.FullName
      ? `/users/findByFullName/${value}`
      : `/users/findByNickName/${value}`
  );

  return data;
};
