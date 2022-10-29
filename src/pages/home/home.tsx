import { useAppDispach, useAppSelector } from '../../redux/store/hooks';
import { useEffect, useState, SyntheticEvent } from 'react';
import { loadPosts } from '../../redux/services/posts/actions';
import {
	getPostError,
	getPostsLoading,
} from '../../redux/services/posts/selectors';
import { loadTags } from '../../redux/services/tags/actions';
import { getIsAuth, getUserName } from '../../redux/services/user/selectors';
import { PathsEnum, TabsEnum } from '../../typedef';
import { Loader } from '../../components/common/loader';
import { removePostError } from '../../redux/services/posts/posts.slice';
import { HomeView } from './view';
import { getToken } from '../../local-storage';
import { useNavigate } from 'react-router-dom';
import { ErrorDialog } from '../../components/dialogs/error';

export const Home = () => {
	const dispatch = useAppDispach();
	const navigate = useNavigate();

	const isToken = Boolean(getToken());
	const isAuth = useAppSelector(getIsAuth);

	const [value, setValue] = useState(TabsEnum.New);

	const userName = useAppSelector(getUserName);
	const error = useAppSelector(getPostError);
	const loading = useAppSelector(getPostsLoading);

	const handleClose = () => {
		dispatch(removePostError());
	};

	const handleChange = (event: SyntheticEvent, newValue: TabsEnum) => {
		setValue(newValue);
	};

	useEffect(() => {
		if (!isToken) {
			navigate(PathsEnum.Login);
		}
	}, [isToken, navigate]);

	useEffect(() => {
		if (value === TabsEnum.New) {
			dispatch(loadPosts('/posts'));
		}

		if (value === TabsEnum.Popular) {
			dispatch(loadPosts('/posts/popular'));
		}
	}, [dispatch, value]);

	useEffect(() => {
		dispatch(loadTags());
	}, [dispatch]);

	return (
		<>
			{isAuth && (
				<HomeView
					userName={userName}
					value={value}
					handleChange={handleChange}
				/>
			)}

			<ErrorDialog open={Boolean(error)} handleClose={handleClose} />

			<Loader open={loading} />
		</>
	);
};
