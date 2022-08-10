import { Tabs, Tab, Grid } from '@mui/material';
import { Post } from '../../components/post';
import { Tags } from '../../components/tags';
import { useAppDispach, useAppSelector } from '../../redux/store/hooks';
import { useEffect } from 'react';
import { loadAllPosts } from '../../redux/services/posts/actions';
import {
	getAllPosts,
	getPostsLoading,
} from '../../redux/services/posts/selectors';
import { loadTags } from '../../redux/services/tags/actions';
import { getTags, getTagsLoading } from '../../redux/services/tags/selectors';
import { getUser } from '../../redux/services/auth/selectors';

export const Home = () => {
	const dispatch = useAppDispach();
	const user = useAppSelector(getUser);

	const posts = useAppSelector(getAllPosts);
	const postsLoading = useAppSelector(getPostsLoading);

	const tags = useAppSelector(getTags);
	const tagsLoading = useAppSelector(getTagsLoading);

	useEffect(() => {
		dispatch(loadAllPosts());
		dispatch(loadTags());
	}, [dispatch]);

	return (
		<>
			<Tabs
				style={{ marginBottom: 15 }}
				value={0}
				aria-label='basic tabs example'
			>
				<Tab label='Новые' />
				<Tab label='Популярные' />
			</Tabs>
			<Grid container spacing={4}>
				<Grid xs={8} item>
					{postsLoading
						? [...Array(5)].map((_, index) => (
								<Post key={index} isLoading={postsLoading} />
						  ))
						: posts.map((post) => (
								<Post
									key={post._id}
									isLoading={postsLoading}
									post={post}
									isEditable={user?._id === post.author._id}
								/>
						  ))}
				</Grid>
				<Grid xs={4} item>
					<Tags tags={tags} isLoading={tagsLoading} />
				</Grid>
			</Grid>
		</>
	);
};
