import { useMutation, useQuery } from 'react-query';
import { QueryKeysLand } from 'config/queryKeys';
import {
  getSelfApi,
  loginApi,
  registerApi
} from 'api/controllers/selfController';
import { getToken, setToken } from 'local-storage';
import { UserType } from 'api/models/UserType';
import { AxiosError } from 'axios';
import { errorNotification } from 'components/Snackbar/Snackbar';
import { getAuthErrorText } from 'components/Auth/utils';
import { AuthRequestType } from 'components/Auth/types';
import { ErrorDataType } from 'typedef';
import { queryClient } from 'config/queryClient';

type useApiProps = {
  setSelf: (self: UserType | null) => void;
};

export const useApi = ({ setSelf }: useApiProps) => {
  const token = getToken();

  const getSelfQuery = useQuery([QueryKeysLand.GET_SELF], getSelfApi, {
    onSuccess: (data) => {
      setSelf(data);
    },
    enabled: !!token
  });

  const onLogin = useMutation(loginApi, {
    onSuccess: (data) => {
      setToken(data);
      queryClient.invalidateQueries([QueryKeysLand.GET_SELF]);
    },
    onError: (error: AxiosError<ErrorDataType>) => {
      errorNotification(
        getAuthErrorText(AuthRequestType.LOGIN, error.response?.data.code)
      );
    }
  });

  const onRegister = useMutation(registerApi, {
    onSuccess: (data) => {
      setToken(data);
      queryClient.invalidateQueries([QueryKeysLand.GET_SELF]);
    },
    onError: (error: AxiosError<ErrorDataType>) => {
      errorNotification(
        getAuthErrorText(AuthRequestType.REGISTER, error.response?.data.code)
      );
    }
  });

  return {
    getSelfQuery,
    onLogin,
    onRegister
  };
};
