import { getUserByNickNameApi } from 'api/controllers/userController';
import { useQuery } from 'react-query';
import { QueryKeysLand } from 'config/queryKeys';

export const useApi = (isSelf: boolean, nickName?: string) => {
  const getUserByNickNameQuery = useQuery(
    [QueryKeysLand.GET_USER_BY_NICKNAME, nickName],
    () => getUserByNickNameApi(nickName),
    { enabled: !isSelf }
  );

  return {
    getUserByNickNameQuery
  };
};
