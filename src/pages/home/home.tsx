import { useAppDispach, useAppSelector } from '../../redux/store/hooks';
import { useEffect, useState, SyntheticEvent } from 'react';
import { loadPosts } from '../../redux/services/posts/actions';
import {
	getPosts,
	getPostsLoading,
	getPostsError,
	getDeletePostLoading,
} from '../../redux/services/posts/selectors';
import { loadTags } from '../../redux/services/tags/actions';
import {
	getTags,
	getTagsError,
	getTagsLoading,
} from '../../redux/services/tags/selectors';
import { getUserId, getUserName } from '../../redux/services/auth/selectors';
import { TabsEnum } from '../../typedef';
import { Loader } from '../../components/loader';
import { DeletePostError } from '../../components/dialogs/delete-post-error';
import { HomeView } from './view';

export const Home = () => {
	const dispatch = useAppDispach();
	const [value, setValue] = useState<TabsEnum>(TabsEnum.New);

	const userId = useAppSelector(getUserId);
	const userName = useAppSelector(getUserName);

	const posts = useAppSelector(getPosts);
	const postsLoading = useAppSelector(getPostsLoading);
	const postsError = useAppSelector(getPostsError);

	const deleteLoading = useAppSelector(getDeletePostLoading);

	const tags = useAppSelector(getTags);
	const tagsLoading = useAppSelector(getTagsLoading);
	const tagsError = useAppSelector(getTagsError);

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
			<HomeView
				userId={userId}
				userName={userName}
				value={value}
				postsLoading={postsLoading}
				tagsLoading={tagsLoading}
				postsError={postsError}
				tagsError={tagsError}
				posts={posts}
				tags={tags}
				handleChange={handleChange}
			/>

			{/* Dialogs */}
			<DeletePostError />

			<Loader open={deleteLoading} />
		</>
	);
};
