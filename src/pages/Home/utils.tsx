import { TabsEnum, TabType } from 'typedef';
import Posts from 'components/Posts';
import { PostType } from 'redux/services/posts/typedef';

type Props = {
  allPosts?: PostType[];
  popularPosts?: PostType[];
  isAllPostsError?: boolean;
  isPopularPostsError?: boolean;
  isPostsLoading?: boolean;
};

export const getPostsTabs = ({
  allPosts,
  popularPosts,
  isAllPostsError,
  isPopularPostsError,
  isPostsLoading
}: Props): TabType[] => {
  return [
    {
      label: TabsEnum.New,
      value: TabsEnum.New,
      tabContent: (
        <Posts
          isLoading={isPostsLoading}
          isError={isAllPostsError}
          posts={allPosts}
        />
      )
    },
    {
      label: TabsEnum.Popular,
      value: TabsEnum.Popular,
      tabContent: (
        <Posts
          isLoading={isPostsLoading}
          isError={isPopularPostsError}
          posts={popularPosts}
        />
      )
    }
  ];
};
