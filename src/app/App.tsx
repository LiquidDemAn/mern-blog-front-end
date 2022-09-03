import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '../components/layout';
import { CreatePost } from '../pages/create-post';
import { FullPost } from '../pages/full-post';
import { Home } from '../pages/home';
import { Login } from '../pages/login';
import { Registration } from '../pages/registration';
import { checkUserAuth } from '../redux/services/auth/actions';
import { useAppDispach } from '../redux/store/hooks';
import { Tag } from '../pages/tag';

export enum PathsEnum {
	Server = 'http://localhost:4444/',
	Home = '/',
	Register = 'register',
	Login = '/login',
	FullPost = 'posts/:id',
	EditPost = 'posts/:id/edit',
	CreatePost = 'create/post',
	Tag = 'tags/:tag',
}

function App() {
	const dispatch = useAppDispach();

	useEffect(() => {
		dispatch(checkUserAuth());
	}, [dispatch]);

	return (
		<Routes>
			<Route path={PathsEnum.Home} element={<Layout />}>
				<Route index element={<Home />} />
				<Route path={PathsEnum.FullPost} element={<FullPost />} />
				<Route path={PathsEnum.CreatePost} element={<CreatePost />} />
				<Route path={PathsEnum.EditPost} element={<CreatePost />} />
				<Route path={PathsEnum.Register} element={<Registration />} />
				<Route path={PathsEnum.Login} element={<Login />} />
				<Route path={PathsEnum.Tag} element={<Tag />} />
			</Route>
		</Routes>
	);
}

export default App;
