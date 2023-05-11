import { useQuery } from 'react-query';
import { QueryKeysLand } from 'config/queryKeys';
import { getSelfApi } from 'controlers/selfControllerApi';

export const useApi = () => {
  const getSelfQuery = useQuery([QueryKeysLand.GET_SELF], getSelfApi);

  return {
    getSelfQuery
  };
};
