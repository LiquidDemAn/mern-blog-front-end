import {
  getUserByNickNameApi,
  searchUsersApi
} from 'api/controllers/userController';
import { useQuery } from 'react-query';
import { QueryKeysLand } from 'config/queryKeys';
import { SearchingUsersRequest } from 'api/models/UserType';

export const useApi = (
  isSelf: boolean,
  searchParams: SearchingUsersRequest,
  nickName?: string
) => {
  const getUserByNickNameQuery = useQuery(
    [QueryKeysLand.GET_USER_BY_NICKNAME, nickName],
    () => getUserByNickNameApi(nickName),
    { enabled: !isSelf }
  );

  const searchUsersQuery = useQuery(
    [QueryKeysLand.SEARCH_USERS, searchParams],
    () => searchUsersApi(searchParams),
    { enabled: !!searchParams.value }
  );

  return {
    getUserByNickNameQuery,
    searchUsersQuery
  };
};
