import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'components/common/layout';
import { CreatePost } from 'pages/create-post';
import { FullPost } from 'pages/full-post';
import { Home } from 'pages/home';
import { Login } from 'pages/login';
import { Registration } from 'pages/registration';
import { checkUserAuth } from 'redux/services/user/actions';
import { useAppDispach, useAppSelector } from 'redux/store/hooks';
import { Tag } from 'pages/tag';
import { PathsEnum } from 'typedef';
import { NotFoundPage } from 'pages/not-found';
import { Profile } from 'pages/profile';
import { getUserLoading } from 'redux/services/user/selectors';
import { Loader } from 'components/common/loader';
import { useApi } from 'app/useApi';
import { AuthContext, AuthProvider } from 'contexts/authContext';
import { UserDataType } from 'contexts/types';

function App() {
  const [self, setSelf] = useState<UserDataType | null>(null);
  const dispatch = useAppDispach();
  const isLoading = useAppSelector(getUserLoading);
  const { getSelfQuery } = useApi();

  console.log(getSelfQuery.data);

  useEffect(() => {
    if (!getSelfQuery?.data) {
      setSelf(null);
    } else {
      setSelf(getSelfQuery.data);
    }
  }, [getSelfQuery.data]);

  const authProviderValue: AuthContext = {
    self
  };

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <AuthProvider value={authProviderValue}>
      <Routes>
        <Route path={PathsEnum.Home} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={PathsEnum.FullPost} element={<FullPost />} />
          <Route path={PathsEnum.CreatePost} element={<CreatePost />} />
          <Route path={PathsEnum.EditPost} element={<CreatePost />} />
          <Route path={PathsEnum.Register} element={<Registration />} />
          <Route path={PathsEnum.Login} element={<Login />} />
          <Route path={PathsEnum.Tag} element={<Tag />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path={PathsEnum.Profile} element={<Profile />} />
        </Route>
      </Routes>
      <Loader open={isLoading} />;
    </AuthProvider>
  );
}

export default App;
