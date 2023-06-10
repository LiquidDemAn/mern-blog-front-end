import { TabsEnum, TabType } from 'typedef';
import { Posts } from 'components/posts/posts-wrapper';
import { PostType } from 'redux/services/posts/typedef';

type Props = {
  allPosts?: PostType[];
  popularPosts?: PostType[];
  isAllPostsError?: boolean;
  isPopularPostsError?: boolean;
  isLoading?: boolean;
};

export const getPostsTabs = ({
  allPosts,
  popularPosts,
  isAllPostsError,
  isPopularPostsError,
  isLoading
}: Props): TabType[] => {
  return [
    {
      label: TabsEnum.New,
      value: TabsEnum.New,
      tabContent: (
        <Posts
          isLoading={isLoading}
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
          isLoading={isLoading}
          isError={isPopularPostsError}
          posts={popularPosts}
        />
      )
    }
  ];
};
