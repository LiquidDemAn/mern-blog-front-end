import { ErrorType, TabsEnum, TabType } from 'typedef';
import { Posts } from 'components/posts/posts-wrapper';
import { PostType } from 'redux/services/posts/typedef';

type Props = {
  isLoading?: boolean;
  isError?: ErrorType | null;
  posts?: PostType[];
};

export const getPostsTabs = ({
  isError,
  posts = [],
  isLoading
}: Props): TabType[] => [
  {
    label: TabsEnum.New,
    value: TabsEnum.New,
    tabContent: <Posts isLoading={isLoading} error={isError} posts={posts} />
  }
];
