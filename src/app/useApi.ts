import { useMutation, useQuery } from 'react-query';
import { QueryKeysLand } from 'config/queryKeys';
import { getSelfApi, loginApi } from 'controlers/selfControllerApi';
import { queryClient } from 'index';
import { setToken } from 'local-storage';

export const useApi = () => {
  const getSelfQuery = useQuery([QueryKeysLand.GET_SELF], getSelfApi);

  const onLogin = useMutation(loginApi, {
    onSuccess: (data) => {
      setToken(data.token);
      queryClient.invalidateQueries([QueryKeysLand.GET_SELF]);
    }
  });

  return {
    getSelfQuery,
    onLogin
  };
};
