import { useQuery } from 'react-query';
import { QueryKeysLand } from 'config/queryKeys';
import { getTagsApi } from 'api/controllers/tagsController';
import { getAllPosts, getPopularPosts } from 'api/controllers/postsController';
import { TabsEnum } from 'typedef';

export const useApi = ({ postsType }: { postsType: TabsEnum }) => {
  const {
    data: tags,
    isLoading: isTagsLoading,
    isError: isTagsError
  } = useQuery([QueryKeysLand.GET_TAGS], getTagsApi);

  const {
    data: allPosts,
    isError: isAllPostsError,
    isLoading: isAllPostsLoading
  } = useQuery(
    [QueryKeysLand.GET_ALL_POSTS, { type: TabsEnum.New }],
    getAllPosts,
    {
      enabled: postsType === TabsEnum.New
    }
  );

  const {
    data: popularPosts,
    isLoading: isPopularPostsLoading,
    isError: isPopularPostsError
  } = useQuery(
    [QueryKeysLand.GET_POPULAR_POSTS, { type: TabsEnum.Popular }],
    getPopularPosts,
    { enabled: postsType === TabsEnum.Popular }
  );

  return {
    tags,
    allPosts,
    popularPosts,
    isTagsError,
    isAllPostsError,
    isPopularPostsError,
    isLoading: isAllPostsLoading || isPopularPostsLoading || isTagsLoading
  };
};
