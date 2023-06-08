import { TabsEnum, TabType } from 'typedef';
import { Posts } from 'components/posts/posts-wrapper';
import { PostType } from 'redux/services/posts/typedef';

type Props = {
  allPosts?: PostType[];
  popularPosts?: PostType[];
  isLoading?: boolean;
  isError?: boolean;
};

export const getPostsTabs = ({
  allPosts,
  popularPosts,
  isError,
  isLoading
}: Props): TabType[] => {
  return [
    {
      label: TabsEnum.New,
      value: TabsEnum.New,
      tabContent: (
        <Posts isLoading={isLoading} error={isError} posts={allPosts} />
      )
    },
    {
      label: TabsEnum.Popular,
      value: TabsEnum.Popular,
      tabContent: (
        <Posts isLoading={isLoading} error={isError} posts={popularPosts} />
      )
    }
  ];
};
