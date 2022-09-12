import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadPosts } from '../../redux/services/posts/actions';
import { loadTags } from '../../redux/services/tags/actions';
import {
	getTags,
	getTagsLoading,
	getTagsError,
} from '../../redux/services/tags/selectors';
import { useAppDispach, useAppSelector } from '../../redux/store/hooks';
import { TabsEnum } from '../../typedef';
import {
	getPostsLoading,
	getPostsError,
	getPosts,
} from '../../redux/services/posts/selectors';
import { getUserId, getUserName } from '../../redux/services/auth/selectors';
import { TagView } from './view';

export const Tag = () => {
	const { tag } = useParams();
	const dispatch = useAppDispach();

	const [value, setValue] = useState(TabsEnum.New);

	const userId = useAppSelector(getUserId);
	const userName = useAppSelector(getUserName);

	const posts = useAppSelector(getPosts);
	const postsLoading = useAppSelector(getPostsLoading);
	const postsError = useAppSelector(getPostsError);

	const tags = useAppSelector(getTags);
	const tagsLoading = useAppSelector(getTagsLoading);
	const tagsError = useAppSelector(getTagsError);

	useEffect(() => {
		if (tag) {
			if (value === TabsEnum.New) {
				dispatch(loadPosts(`/posts/tags/${tag}`));
			}
			if (value === TabsEnum.Popular) {
				dispatch(loadPosts(`/posts/tags/${tag}/popular`));
			}
		}
	}, [dispatch, value, tag]);

	useEffect(() => {
		if (!tags.length) {
			dispatch(loadTags());
		}
	}, [dispatch, tags]);

	const handleChange = (event: React.SyntheticEvent, newValue: TabsEnum) => {
		setValue(newValue);
	};
	return (
		<div>
			<h2>Tag: #{tag}</h2>

			<TagView
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
		</div>
	);
};
