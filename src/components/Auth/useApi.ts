import { useMutation, useQuery } from 'react-query';
import { QueryKeysLand } from 'config/queryKeys';
import {
  getSelfApi,
  loginApi,
  registerApi
} from 'controlers/selfControllerApi';
import { queryClient } from 'index';
import { setToken } from 'local-storage';
import { UserDataType } from 'components/Auth/types';

type useApiProps = {
  setSelf: (self: (UserDataType & { token: string }) | null) => void;
};

export const useApi = ({ setSelf }: useApiProps) => {
  const getSelfQuery = useQuery([QueryKeysLand.GET_SELF], getSelfApi, {
    onSuccess: (data) => {
      setSelf(data);
    }
  });

  const onLogin = useMutation(loginApi, {
    onSuccess: (data) => {
      setToken(data);
      queryClient.invalidateQueries([QueryKeysLand.GET_SELF]);
    }
  });

  const onRegister = useMutation(registerApi, {
    onSuccess: (data) => {
      setToken(data);
      queryClient.invalidateQueries([QueryKeysLand.GET_SELF]);
    }
  });

  return {
    getSelfQuery,
    onLogin,
    onRegister
  };
};
