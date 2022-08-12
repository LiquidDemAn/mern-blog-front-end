import { Tabs, Tab, Grid } from '@mui/material';
import { TabPanel } from '../../components/tab-panel';
import { Post } from '../../components/post';
import { Tags } from '../../components/tags';
import { useAppDispach, useAppSelector } from '../../redux/store/hooks';
import { useEffect, useState } from 'react';
import { loadAllPosts } from '../../redux/services/posts/actions';
import {
	getAllPosts,
	getPostsLoading,
} from '../../redux/services/posts/selectors';
import { loadTags } from '../../redux/services/tags/actions';
import { getTags, getTagsLoading } from '../../redux/services/tags/selectors';
import { getUser } from '../../redux/services/auth/selectors';

export enum TabsEnum {
	New = 'New',
	Popular = 'Popular',
}

export const Home = () => {
	const dispatch = useAppDispach();
	const user = useAppSelector(getUser);
	const [value, setValue] = useState<TabsEnum>(TabsEnum.New);

	const posts = useAppSelector(getAllPosts);
	const postsLoading = useAppSelector(getPostsLoading);

	const tags = useAppSelector(getTags);
	const tagsLoading = useAppSelector(getTagsLoading);

	useEffect(() => {
		dispatch(loadAllPosts());
		dispatch(loadTags());
	}, [dispatch]);

	const handleChange = (event: React.SyntheticEvent, newValue: TabsEnum) => {
		setValue(newValue);
	};
	console.log(value);

	return (
		<>
			<h1>Hello {user?.fullName}</h1>
			<Tabs style={{ marginBottom: 15 }} value={value} onChange={handleChange}>
				<Tab
					aria-controls={`tabpanel-${TabsEnum.New}`}
					label={TabsEnum.New}
					value={TabsEnum.New}
				/>
				<Tab
					aria-controls={`tabpanel-${TabsEnum.Popular}`}
					// onClick={() => {
					// 	dispatch(loadTags());
					// }}
					label={TabsEnum.Popular}
					value={TabsEnum.Popular}
				/>
			</Tabs>
			<Grid container spacing={4}>
				<Grid xs={8} item>
					<TabPanel value={value} index={TabsEnum.New}>
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
					</TabPanel>
					<TabPanel value={value} index={TabsEnum.Popular}>
						<>Popular</>
					</TabPanel>
				</Grid>
				<Grid xs={4} item>
					<Tags tags={tags} isLoading={tagsLoading} />
				</Grid>
			</Grid>
		</>
	);
};
