import { useAppDispach, useAppSelector } from '../../redux/store/hooks';
import { useEffect, useState, SyntheticEvent } from 'react';
import { loadPosts } from '../../redux/services/posts/actions';
import { getDeletePostLoading } from '../../redux/services/posts/selectors';
import { loadTags } from '../../redux/services/tags/actions';
import { getUserName } from '../../redux/services/auth/selectors';
import { TabsEnum } from '../../typedef';
import { Loader } from '../../components/loader';
import { DeletePostError } from '../../components/dialogs/delete-post-error';
import { PostsTagsContent } from '../../components/posts-tags-content';

export const Home = () => {
	const dispatch = useAppDispach();
	const [value, setValue] = useState(TabsEnum.New);

	const userName = useAppSelector(getUserName);
	const deleteLoading = useAppSelector(getDeletePostLoading);

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

	return (
		<>
			<h2 style={{ marginBottom: 15 }}>Hello{userName && `, ${userName}`}</h2>
			<PostsTagsContent value={value} handleChange={handleChange} />

			{/* Dialogs */}
			<DeletePostError />

			<Loader open={deleteLoading} />
		</>
	);
};
