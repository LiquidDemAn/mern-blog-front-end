import { Tabs, Tab, Grid } from '@mui/material';
import { Post } from '../../components/post';
import { Tags } from '../../components/tags';
import { Comments } from '../../components/comments';
import { useAppDispach, useAppSelector } from '../../redux/store/hooks';
import { useEffect } from 'react';
import { loadAllPosts } from '../../redux/services/posts/actions';
import {
	getAllPosts,
	getPostsLoading,
} from '../../redux/services/posts/selectors';
import { loadTags } from '../../redux/services/tags/actions';
import { getTags, getTagsLoading } from '../../redux/services/tags/selectors';

export const Home = () => {
	const dispatch = useAppDispach();

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
					{(postsLoading ? [...Array(5)] : posts).map((post, index) =>
						postsLoading ? (
							<Post key={index} isLoading={postsLoading} />
						) : (
							<Post
								key={post._id}
								isLoading={postsLoading}
								post={post}
								isEditable
							/>
						)
					)}
				</Grid>
				<Grid xs={4} item>
					<Tags tags={tags} isLoading={tagsLoading} />
					<Comments
						items={[
							{
								user: {
									fullName: 'Вася Пупкин',
									avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
								},
								text: 'Это тестовый комментарий',
							},
							{
								user: {
									fullName: 'Иван Иванов',
									avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
								},
								text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
							},
						]}
						isLoading={false}
					/>
				</Grid>
			</Grid>
		</>
	);
};
