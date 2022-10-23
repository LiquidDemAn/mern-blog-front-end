import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout';
import { CreatePost } from '../pages/create-post';
import { FullPost } from '../pages/full-post';
import { Home } from '../pages/home';
import { Login } from '../pages/login';
import { Registration } from '../pages/registration';
import { checkUserAuth } from '../redux/services/user/actions';
import { useAppDispach, useAppSelector } from '../redux/store/hooks';
import { Tag } from '../pages/tag';
import { PathsEnum } from '../typedef';
import { NotFoundPage } from '../pages/not-found';
import { Profile } from '../pages/profile';
import { getIsAuth, getUserLoading } from '../redux/services/user/selectors';
import { Loader } from '../components/loader';

function App() {
	const navigate = useNavigate();

	const dispatch = useAppDispach();
	const isAuth = useAppSelector(getIsAuth);
	const isLoading = useAppSelector(getUserLoading);

	useEffect(() => {
		dispatch(checkUserAuth());
	}, [dispatch]);

	// useEffect(() => {
	// 	if (!isAuth && !isLoading) {
	// 		navigate('/login');
	// 	}
	// }, [isAuth, isLoading, navigate]);

	return (
		<>
			<Routes>
				<Route path={PathsEnum.Home} element={<Layout />}>
					<Route index element={<Home />} />
					<Route path={PathsEnum.FullPost} element={<FullPost />} />
					<Route path={PathsEnum.CreatePost} element={<CreatePost />} />
					<Route path={PathsEnum.EditPost} element={<CreatePost />} />
					<Route path={PathsEnum.Register} element={<Registration />} />
					<Route path={PathsEnum.Login} element={<Login />} />
					<Route path={PathsEnum.Tag} element={<Tag />} />
					<Route path='*' element={<NotFoundPage />} />
					<Route path={PathsEnum.Profile} element={<Profile />} />
				</Route>
			</Routes>
			<Loader open={isLoading} />;
		</>
	);
}

export default App;
