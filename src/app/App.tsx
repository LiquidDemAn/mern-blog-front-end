import { Route, Routes } from 'react-router-dom';
import { Layout } from 'components/common/layout';
import { CreatePost } from 'pages/create-post';
import { FullPost } from 'pages/full-post';
import { Home } from 'pages/home';
import { Registration } from 'pages/registration';
import { Tag } from 'pages/tag';
import { PathsEnum } from 'typedef';
import { NotFoundPage } from 'pages/not-found';
import { Profile } from 'pages/profile';
import Auth from 'components/Auth';
import LoginPage from 'pages/Login';

function App() {
  return (
    <Auth>
      <Routes>
        <Route path={PathsEnum.Home} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path={PathsEnum.FullPost} element={<FullPost />} />
          <Route path={PathsEnum.CreatePost} element={<CreatePost />} />
          <Route path={PathsEnum.EditPost} element={<CreatePost />} />
          <Route path={PathsEnum.Register} element={<Registration />} />
          <Route path={PathsEnum.Login} element={<LoginPage />} />
          <Route path={PathsEnum.Tag} element={<Tag />} />
          <Route path={PathsEnum.Profile} element={<Profile />} />
        </Route>
      </Routes>
    </Auth>
  );
}

export default App;
