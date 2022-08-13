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
	Host = 'http://localhost:4444',
	Home = '/',
	Login = 'login',
	Register = 'register',
	CreatePost = 'create/post',
	// Post = `posts/:id`,
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
				<Route path='posts/:id' element={<FullPost />} />
				<Route path={PathsEnum.CreatePost} element={<CreatePost />} />
				<Route path='/posts/:id/edit' element={<CreatePost />} />
				<Route path={PathsEnum.Register} element={<Registration />} />
				<Route path={PathsEnum.Login} element={<Login />} />
				<Route path='/tags/:tag' element={<Tag />} />
			</Route>
		</Routes>
	);
}

export default App;
