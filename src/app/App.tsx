import { Route, Routes } from 'react-router-dom';
import { Layout } from '../components/layout';
import { CreatePost } from '../pages/create-post';
import { FullPost } from '../pages/full-post';
import { Home } from '../pages/home';
import { Login } from '../pages/login';
import { Registration } from '../pages/registration';

export enum PathsEnum {
	Home = '/',
	Login = 'login',
	Register = 'register',
	CreatePost = 'create/post',
	Post = 'posts/:id',
}

function App() {
	return (
		<Routes>
			<Route path={PathsEnum.Home} element={<Layout />}>
				<Route index element={<Home />} />
				<Route path={PathsEnum.Post} element={<FullPost />} />
				<Route path={PathsEnum.CreatePost} element={<CreatePost />} />
				<Route path={PathsEnum.Register} element={<Registration />} />
				<Route path={PathsEnum.Login} element={<Login />} />
			</Route>
		</Routes>
	);
}

export default App;
