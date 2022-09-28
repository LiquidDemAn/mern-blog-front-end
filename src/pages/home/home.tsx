import { useAppDispach, useAppSelector } from '../../redux/store/hooks';
import { useEffect, useState, SyntheticEvent } from 'react';
import { loadPosts } from '../../redux/services/posts/actions';
import {
	getDeletePostError,
	getDeletePostLoading,
} from '../../redux/services/posts/selectors';
import { loadTags } from '../../redux/services/tags/actions';
import { getUserName } from '../../redux/services/auth/selectors';
import { TabsEnum } from '../../typedef';
import { Loader } from '../../components/loader';
import { PostsTagsContent } from '../../components/posts-tags-content';
import { removeDeletePostError } from '../../redux/services/posts/posts.slice';
import { ErrorDialog } from '../../components/dialogs/error';

export const Home = () => {
	const dispatch = useAppDispach();

	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(TabsEnum.New);

	const userName = useAppSelector(getUserName);
	const deleteError = useAppSelector(getDeletePostError);
	const deleteLoading = useAppSelector(getDeletePostLoading);

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
			<h2 style={{ marginBottom: 15 }}>Hello{userName && `, ${userName}`}</h2>
			<PostsTagsContent value={value} handleChange={handleChange} />

			{/* Dialogs */}

			<ErrorDialog
				open={open}
				handleClose={handleClose}
				title='Deletion Error!'
			>
				<>
					{deleteError?.status === 500 && (
						<>Something went wrong!!!!! Try again later...</>
					)}

					{deleteError?.status === 404 && <>Post not found!</>}
				</>
			</ErrorDialog>

			<Loader open={deleteLoading} />
		</>
	);
};
