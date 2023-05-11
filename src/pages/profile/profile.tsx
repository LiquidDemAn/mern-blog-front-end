import { useNavigate, useParams } from 'react-router-dom';
import { getUserError, getUserLoading } from 'redux/services/user/selectors';
import { useAppDispach, useAppSelector } from 'redux/store/hooks';
import { TabsEnum } from 'typedef';
import { SyntheticEvent, useEffect, useState } from 'react';
import { FoundUserType, UserDataType } from 'redux/services/user/typedef';
import { AxiosError } from 'axios';
import { loadPosts } from 'redux/services/posts/actions';
import {
  getPosts,
  getPostsLoading,
  getPostsError
} from 'redux/services/posts/selectors';
import { loadUser } from 'redux/services/user/actions';
import { ErrorDialog } from 'components/dialogs/error';
import { Loader } from 'components/common/loader';

import { ProfileView } from './view';
import { resetErrors } from 'redux/services/user/user.slice';
import { useSelf } from 'hooks/useSelf';

export const Profile = () => {
  const { nickName } = useParams();
  const dispatch = useAppDispach();
  const navigate = useNavigate();

  const [tabValue, setTabValue] = useState(TabsEnum.FindPerson);
  const [user, setUser] = useState<UserDataType | null>(null);
  const [foundUsers, setFoundUsers] = useState<FoundUserType[] | null>(null);
  const [profileError, setProfileError] = useState<AxiosError | null>(null);
  const [foundUsersLoading, setFoundUsersLoading] = useState(false);

  const posts = useAppSelector(getPosts);
  const postsLoading = useAppSelector(getPostsLoading);
  const postsError = useAppSelector(getPostsError);

  const { self } = useSelf();
  const logedUserError = useAppSelector(getUserError);
  const logedUserLoading = useAppSelector(getUserLoading);

  const isSelf = nickName === self?.nickName;

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
    } else if (nickName) {
      dispatch(loadUser({ nickName, setUser, setProfileError }));
    }
  }, [isSelf, nickName, self, dispatch]);

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

      <Loader open={logedUserLoading || foundUsersLoading} />
    </>
  );
};
