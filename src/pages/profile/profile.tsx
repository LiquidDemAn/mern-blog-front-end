import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispach, useAppSelector } from 'redux/store/hooks';
import { SyntheticEvent, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { loadPosts } from 'redux/services/posts/actions';
import {
  getPosts,
  getPostsError,
  getPostsLoading
} from 'redux/services/posts/selectors';
import { ErrorDialog } from 'components/dialogs/error';
import { useSelf } from 'hooks/useSelf';
import { SearchingUsersRequest, UserType } from 'api/models/UserType';
import { useApi } from 'pages/profile/useApi';
import { getDefaultTabsList } from 'pages/profile/utils';
import styles from 'pages/profile/profile.module.scss';
import { ProfileCard } from 'components/user/profile-card';
import TabBar from 'components/TabBar';
import { useSearchUsersForm } from 'pages/profile/useSearchUsersForm';
import { TabsEnum } from 'typedef';

export const Profile = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [filters, setFilters] = useState({} as SearchingUsersRequest);
  const [profileError, setProfileError] = useState<AxiosError | null>(null);
  const [currentTab, setCurrentTab] = useState(TabsEnum.Posts);

  const { nickName } = useParams();
  const dispatch = useAppDispach();
  const navigate = useNavigate();

  const posts = useAppSelector(getPosts);
  const postsLoading = useAppSelector(getPostsLoading);
  const postsError = useAppSelector(getPostsError);

  const { self } = useSelf();
  const isSelf = nickName === self?.nickName;

  const { getUserByNickNameQuery, searchUsersQuery } = useApi(
    isSelf,
    filters,
    nickName
  );

  const foundUsers = searchUsersQuery.data;

  const { form, onSubmit, searchType } = useSearchUsersForm(setFilters);

  const tabs = getDefaultTabsList({
    user,
    isSelf,
    foundUsers,
    posts,
    postsError,
    postsLoading,
    form,
    searchType,
    onSubmit
  });

  const handleChange = (event: SyntheticEvent, newTab: TabsEnum) => {
    setCurrentTab(newTab);
  };

  const handleErrorClose = () => {
    if (profileError) {
      setProfileError(null);
    }
  };

  useEffect(() => {
    if (profileError) {
      navigate(`/${self?.nickName}`);
    }
  }, [profileError, self?.nickName, navigate]);

  useEffect(() => {
    if (user?._id) {
      dispatch(loadPosts(`posts/users/${user._id}`));
    }
  }, [dispatch, user?._id]);

  useEffect(() => {
    if (isSelf) {
      setUser(self);
    } else {
      setUser(getUserByNickNameQuery.data || null);
    }
  }, [isSelf, getUserByNickNameQuery.data, self]);

  return (
    <>
      <div className={styles.profile}>
        <ProfileCard user={user} isLogedUser={isSelf} />
        <main className={styles.main}>
          <TabBar
            tabs={tabs}
            currentTab={currentTab}
            handleChange={handleChange}
          />
        </main>
      </div>

      <ErrorDialog
        open={Boolean(profileError)}
        handleClose={handleErrorClose}
      />
    </>
  );
};
