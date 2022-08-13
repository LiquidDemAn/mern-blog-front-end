import { Tabs, Tab, Grid } from '@mui/material';
import { TabPanel } from '../../components/tab-panel';
import { Tags } from '../../components/tags';
import { useAppDispach, useAppSelector } from '../../redux/store/hooks';
import { useEffect, useState } from 'react';
import {
	loadAllPosts,
	loadPopularPosts,
} from '../../redux/services/posts/actions';
import {
	getAllPosts,
	getPopularPosts,
	getPostsLoading,
	getPostsError,
} from '../../redux/services/posts/selectors';
import { loadTags } from '../../redux/services/tags/actions';
import {
	getTags,
	getTagsError,
	getTagsLoading,
} from '../../redux/services/tags/selectors';
import { getUser } from '../../redux/services/auth/selectors';
import { Posts } from '../../components/posts';

export enum TabsEnum {
	New = 'New',
	Popular = 'Popular',
}

export const Home = () => {
	const dispatch = useAppDispach();
	const user = useAppSelector(getUser);
	const [value, setValue] = useState<TabsEnum>(TabsEnum.New);

	const posts = useAppSelector(getAllPosts);
	const popularPosts = useAppSelector(getPopularPosts);
	const isLoading = useAppSelector(getPostsLoading);
	const postsError = useAppSelector(getPostsError);

	const tags = useAppSelector(getTags);
	const tagsLoading = useAppSelector(getTagsLoading);
	const tagsError = useAppSelector(getTagsError);

	useEffect(() => {
		dispatch(loadAllPosts());
		dispatch(loadTags());
	}, [dispatch]);

	const handleChange = (event: React.SyntheticEvent, newValue: TabsEnum) => {
		setValue(newValue);
	};

	const handleAllPosts = () => {
		dispatch(loadAllPosts());
	};

	const handlePopularPosts = () => {
		dispatch(loadPopularPosts());
	};

	return (
		<>
			<h2>Hello {user?.fullName}</h2>

			<Tabs style={{ marginBottom: 15 }} value={value} onChange={handleChange}>
				<Tab
					aria-controls={`tabpanel-${TabsEnum.New}`}
					onClick={handleAllPosts}
					label={TabsEnum.New}
					value={TabsEnum.New}
				/>
				<Tab
					aria-controls={`tabpanel-${TabsEnum.Popular}`}
					onClick={handlePopularPosts}
					label={TabsEnum.Popular}
					value={TabsEnum.Popular}
				/>
			</Tabs>

			<Grid container spacing={4}>
				<Grid xs={8} item>
					<TabPanel value={value} index={TabsEnum.New}>
						<Posts
							isLoading={isLoading}
							error={postsError}
							userId={user?._id}
							posts={posts}
						/>
					</TabPanel>
					<TabPanel value={value} index={TabsEnum.Popular}>
						<Posts
							isLoading={isLoading}
							error={postsError}
							userId={user?._id}
							posts={popularPosts}
						/>
					</TabPanel>
				</Grid>

				<Grid xs={4} item>
					<Tags error={tagsError} tags={tags} isLoading={tagsLoading} />
				</Grid>
			</Grid>
		</>
	);
};
