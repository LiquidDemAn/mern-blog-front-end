import { useNavigate, useParams } from 'react-router-dom';
import { getUserError } from 'redux/services/user/selectors';
import { useAppDispach, useAppSelector } from 'redux/store/hooks';
import { TabsEnum } from 'typedef';
import { SyntheticEvent, useEffect, useState } from 'react';
import { FoundUserType } from 'redux/services/user/typedef';
import { AxiosError } from 'axios';
import { loadPosts } from 'redux/services/posts/actions';
import {
  getPosts,
  getPostsLoading,
  getPostsError
} from 'redux/services/posts/selectors';
import { ErrorDialog } from 'components/dialogs/error';
import { Loader } from 'components/common/loader';

import { ProfileView } from './view';
import { resetErrors } from 'redux/services/user/user.slice';
import { useSelf } from 'hooks/useSelf';
import { UserType } from 'api/models/UserType';
import { useApi } from 'pages/profile/useApi';

export const Profile = () => {
  const { nickName } = useParams();
  const dispatch = useAppDispach();
  const navigate = useNavigate();

  const [tabValue, setTabValue] = useState(TabsEnum.FindPerson);
  const [user, setUser] = useState<UserType | null>(null);
  const [foundUsers, setFoundUsers] = useState<FoundUserType[] | null>(null);
  const [profileError, setProfileError] = useState<AxiosError | null>(null);
  const [foundUsersLoading, setFoundUsersLoading] = useState(false);

  const posts = useAppSelector(getPosts);
  const postsLoading = useAppSelector(getPostsLoading);
  const postsError = useAppSelector(getPostsError);

  const { self } = useSelf();
  const logedUserError = useAppSelector(getUserError);

  const isSelf = nickName === self?.nickName;

  const { getUserByNickNameQuery } = useApi(isSelf, nickName);

  const handleChange = (event: SyntheticEvent, newValue: TabsEnum) => {
    setTabValue(newValue);
  };

  const handleErrorClose = () => {
    if (profileError) {
      setProfileError(null);
    }

    if (logedUserError) {
      dispatch(resetErrors());
    }
  };

  useEffect(() => {
    if (profileError) {
      navigate(`/${self?.nickName}`);
    }
  }, [profileError, self?.nickName, navigate]);

  useEffect(() => {
    setTabValue(TabsEnum.Posts);
  }, [nickName]);

  useEffect(() => {
    if (user?._id) {
      dispatch(loadPosts(`/posts/users/${user._id}`));
    }
  }, [dispatch, user?._id]);

  useEffect(() => {
    if (isSelf) {
      setUser(self);
    } else {
      setUser(getUserByNickNameQuery.data || null);
    }
  }, [isSelf, getUserByNickNameQuery.data]);

  return (
    <>
      <ProfileView
        user={user}
        posts={posts}
        foundUsers={foundUsers}
        tabValue={tabValue}
        postsError={postsError}
        isLogedUser={isSelf}
        postsLoading={postsLoading}
        handleChange={handleChange}
        setSearchData={setFoundUsers}
        setProfileError={setProfileError}
        setFoundUsersLoading={setFoundUsersLoading}
      />

      <ErrorDialog
        open={Boolean(profileError) || Boolean(logedUserError)}
        handleClose={handleErrorClose}
      />

      <Loader open={foundUsersLoading} />
    </>
  );
};
