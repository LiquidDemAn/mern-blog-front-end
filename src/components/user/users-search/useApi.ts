import { useQuery } from 'react-query';
import { QueryKeysLand } from 'config/queryKeys';
import { searchUsersApi } from 'api/controllers/userController';
import { SearchingUsersRequest } from 'api/models/UserType';

export const useApi = (params: SearchingUsersRequest) => {
  const searchUsersQuery = useQuery(
    [QueryKeysLand.SEARCH_USERS, params],
    () => searchUsersApi(params),
    { enabled: !!params.value }
  );

  return { searchUsersQuery };
};
