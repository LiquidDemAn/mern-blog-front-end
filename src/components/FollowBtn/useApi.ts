import { useMutation } from 'react-query';
import {
  followUserApi,
  unFollowUserApi
} from 'api/controllers/followUserController';
import { queryClient } from 'index';
import { QueryKeysLand } from 'config/queryKeys';

export const useApi = () => {
  const follow = useMutation(followUserApi, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeysLand.GET_SELF]);
    }
  });

  const unFollow = useMutation(unFollowUserApi, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeysLand.GET_SELF]);
    }
  });

  return { follow, unFollow };
};
