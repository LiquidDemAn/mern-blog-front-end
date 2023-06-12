import { useQuery } from 'react-query';
import { QueryKeysLand } from 'config/queryKeys';
import { getTagsApi } from 'api/controllers/tagsController';
import { getAllPosts, getPopularPosts } from 'api/controllers/postsController';
import { TabsEnum } from 'typedef';
import { useSelf } from '../../hooks/useSelf';

export const useApi = ({ postsType }: { postsType: TabsEnum }) => {
  const { isAuth } = useSelf();

  const {
    data: tags,
    isLoading: isTagsLoading,
    isError: isTagsError
  } = useQuery([QueryKeysLand.GET_TAGS], getTagsApi, { enabled: isAuth });

  const {
    data: allPosts,
    isError: isAllPostsError,
    isLoading: isAllPostsLoading
  } = useQuery(
    [QueryKeysLand.GET_ALL_POSTS, { type: TabsEnum.New }],
    getAllPosts,
    {
      enabled: postsType === TabsEnum.New && isAuth
    }
  );

  const {
    data: popularPosts,
    isLoading: isPopularPostsLoading,
    isError: isPopularPostsError
  } = useQuery(
    [QueryKeysLand.GET_POPULAR_POSTS, { type: TabsEnum.Popular }],
    getPopularPosts,
    { enabled: postsType === TabsEnum.Popular && isAuth }
  );

  return {
    tags,
    allPosts,
    popularPosts,
    isTagsError,
    isAllPostsError,
    isPopularPostsError,
    isTagsLoading,
    isPostsLoading: isAllPostsLoading || isPopularPostsLoading
  };
};
