import { useQuery } from 'react-query';
import { QueryKeysLand } from 'config/queryKeys';
import { getTagsApi } from 'api/controllers/tagsController';

export const useApi = () => {
  const getTagsQuery = useQuery([QueryKeysLand.GET_TAGS], getTagsApi);
  return { getTagsQuery };
};
