import { customeAxios } from 'redux/axios';
import {
  FindUsersEnum,
  SearchingUsersRequest,
  SearchingUserType,
  UserType
} from 'api/models/UserType';

const baseUrl = 'users/';

export const getUserByNickNameApi = async (nickName?: string) => {
  const { data } = await customeAxios.get<UserType>(`${baseUrl}${nickName}`);
  return data;
};

export const searchUsersApi = async (params: SearchingUsersRequest) => {
  const { searchType, value } = params;

  const { data } = await customeAxios.get<SearchingUserType[]>(
    searchType === FindUsersEnum.FullName
      ? `${baseUrl}findByFullName/${value}`
      : `${baseUrl}findByNickName/${value}`
  );

  return data;
};
