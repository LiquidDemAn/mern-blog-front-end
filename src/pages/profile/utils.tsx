import { ErrorType, TabsEnum, TabType } from 'typedef';
import {
  FindUsersEnum,
  SearchingUsersRequest,
  SearchingUserType,
  UserType
} from 'api/models/UserType';
import { Posts } from 'components/posts/posts-wrapper';
import { PostType } from 'redux/services/posts/typedef';
import { Followers } from 'components/user/followers';
import { UseFormReturn } from 'react-hook-form';
import UsersSearch from './components/users-search';

type TabsListProps = {
  user: UserType | null;
  isSelf: boolean;
  foundUsers?: SearchingUserType[];
  postsError: ErrorType | null;
  postsLoading?: boolean;
  posts: PostType[];
  searchType: FindUsersEnum;
  form: UseFormReturn<SearchingUsersRequest>;
  onSubmit: (values: any) => void;
};
export const getDefaultTabsList = ({
  user,
  isSelf,
  foundUsers,
  posts,
  postsError,
  postsLoading,
  searchType,
  form,
  onSubmit
}: TabsListProps): TabType[] => {
  const tabs: TabType[] = [
    {
      label: TabsEnum.Posts,
      value: TabsEnum.Posts,
      tabContent: (
        <Posts
          error={postsError as boolean}
          isLoading={postsLoading}
          posts={posts}
        />
      )
    },
    {
      label: `${TabsEnum.Followers} (${user?.followers.length})`,
      value: TabsEnum.Followers,
      tabContent: <Followers followers={user?.followers} />
    },
    {
      label: `${TabsEnum.Following} (${user?.following.length})`,
      value: TabsEnum.Following,
      tabContent: <Followers followers={user?.following} />
    }
  ];

  if (isSelf) {
    tabs.push({
      label: `${TabsEnum.FindPerson} ${
        foundUsers ? `(${foundUsers.length})` : ''
      }`,
      value: TabsEnum.FindPerson,
      tabContent: (
        <>
          <UsersSearch
            searchType={searchType}
            onSubmit={onSubmit}
            form={form}
          />
          <Followers followers={foundUsers} />
        </>
      )
    });
  }

  return tabs;
};
