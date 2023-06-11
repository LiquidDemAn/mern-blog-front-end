import { Route, Routes } from 'react-router-dom';
import { Layout } from 'components/Layout';
import { CreatePost } from 'pages/create-post';
import { FullPost } from 'pages/full-post';
import { Tag } from 'pages/tag';
import { PathsEnum } from 'typedef';
import { NotFoundPage } from 'pages/not-found';
import { Profile } from 'pages/profile';
import Auth from 'components/Auth';
import Home from 'pages/Home';
import LoginPage from 'pages/Login';
import RegistrationPage from 'pages/Registration';
import Snackbar from 'components/Snackbar';

function App() {
  return (
    <Auth>
      <Snackbar />
      <Routes>
        <Route path={PathsEnum.Home} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path={PathsEnum.FullPost} element={<FullPost />} />
          <Route path={PathsEnum.CreatePost} element={<CreatePost />} />
          <Route path={PathsEnum.EditPost} element={<CreatePost />} />
          <Route path={PathsEnum.Register} element={<RegistrationPage />} />
          <Route path={PathsEnum.Login} element={<LoginPage />} />
          <Route path={PathsEnum.Tag} element={<Tag />} />
          <Route path={PathsEnum.Profile} element={<Profile />} />
        </Route>
      </Routes>
    </Auth>
  );
}

export default App;
