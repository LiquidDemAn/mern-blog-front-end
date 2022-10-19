import { useAppDispach, useAppSelector } from '../../redux/store/hooks';
import { useEffect, useState, SyntheticEvent } from 'react';
import { loadPosts } from '../../redux/services/posts/actions';
import {
	getDeletePostError,
	getDeletePostLoading,
} from '../../redux/services/posts/selectors';
import { loadTags } from '../../redux/services/tags/actions';
import { getIsAuth, getUserName } from '../../redux/services/user/selectors';
import { TabsEnum } from '../../typedef';
import { Loader } from '../../components/loader';
import { removeDeletePostError } from '../../redux/services/posts/posts.slice';
import { HomeView } from './view';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
	const dispatch = useAppDispach();
	const navigate = useNavigate();

	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(TabsEnum.New);

	const userName = useAppSelector(getUserName);
	const deleteError = useAppSelector(getDeletePostError);
	const deleteLoading = useAppSelector(getDeletePostLoading);
	const isAuth = useAppSelector(getIsAuth);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		dispatch(removeDeletePostError());
	};

	const handleChange = (event: SyntheticEvent, newValue: TabsEnum) => {
		setValue(newValue);
	};

	useEffect(() => {
		console.log(1);

		if (!isAuth) {
			navigate('/login');
		}
	}, [isAuth, navigate]);

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

	useEffect(() => {
		if (deleteError) {
			handleOpen();
		}
	}, [deleteError]);

	return (
		<>
			<HomeView
				open={open}
				userName={userName}
				value={value}
				deleteError={deleteError}
				handleChange={handleChange}
				handleClose={handleClose}
			/>

			<Loader open={deleteLoading} />
		</>
	);
};
