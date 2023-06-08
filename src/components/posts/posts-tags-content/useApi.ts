import { useQuery } from 'react-query';
import { QueryKeysLand } from 'config/queryKeys';
import { getTagsApi } from 'api/controllers/tagsController';
import { getAllPosts, getPopularPosts } from 'api/controllers/postsController';
import { TabsEnum } from 'typedef';

export const useApi = ({ postsType }: { postsType: TabsEnum }) => {
  const getTagsQuery = useQuery([QueryKeysLand.GET_TAGS], getTagsApi);

  const getAllPostsQuery = useQuery(
    [QueryKeysLand.GET_ALL_POSTS, TabsEnum.New],
    getAllPosts,
    { enabled: postsType === TabsEnum.New }
  );

  const getPopularPostsQuery = useQuery(
    [QueryKeysLand.GET_POPULAR_POSTS, TabsEnum.Popular],
    getPopularPosts,
    { enabled: postsType === TabsEnum.Popular }
  );

  return { getTagsQuery, getAllPostsQuery, getPopularPostsQuery };
};
