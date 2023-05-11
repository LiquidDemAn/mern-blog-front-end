import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'components/common/layout';
import { CreatePost } from 'pages/create-post';
import { FullPost } from 'pages/full-post';
import { Home } from 'pages/home';
import { Login } from 'pages/login';
import { Registration } from 'pages/registration';
import { useAppDispach } from 'redux/store/hooks';
import { Tag } from 'pages/tag';
import { PathsEnum } from 'typedef';
import { NotFoundPage } from 'pages/not-found';
import { Profile } from 'pages/profile';
import { Loader } from 'components/common/loader';
import { useApi } from 'app/useApi';
import { AuthContext, AuthProvider } from 'contexts/authContext';
import { LoginType, UserDataType } from 'contexts/types';

function App() {
  const [self, setSelf] = useState<UserDataType | null>(null);
  const isAuth = !!self;
  const { getSelfQuery, onLogin } = useApi();

  console.log(getSelfQuery.data);

  const login = (params: LoginType) => {
    onLogin.mutate(params);
  };

  useEffect(() => {
    if (!getSelfQuery?.data) {
      setSelf(null);
    } else {
      setSelf(getSelfQuery.data);
    }
  }, [getSelfQuery.data]);

  const authProviderValue: AuthContext = {
    self,
    isAuth,
    selfId: self?._id || '',
    isSelfLoading: getSelfQuery.isLoading,
    login
  };

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
      <Loader open={getSelfQuery.isLoading} />;
    </AuthProvider>
  );
}

export default App;
