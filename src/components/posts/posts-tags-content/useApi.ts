import { useQuery } from 'react-query';
import { QueryKeysLand } from '../../../config/queryKeys';
import { getTags } from '../../../api/controllers/tagsController';

export const useApi = (isSelf?: boolean) => {
  const getTagsQuery = useQuery([QueryKeysLand.GET_TAGS], getTags);
  return { getTagsQuery };
};
