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
import { TabsEnum } from '../../typedef';

export const Home = () => {
	const dispatch = useAppDispach();
	const [value, setValue] = useState<TabsEnum>(TabsEnum.New);

	const user = useAppSelector(getUser);

	const posts = useAppSelector(getAllPosts);
	const postsLoading = useAppSelector(getPostsLoading);
	const postsError = useAppSelector(getPostsError);

	const tags = useAppSelector(getTags);
	const tagsLoading = useAppSelector(getTagsLoading);
	const tagsError = useAppSelector(getTagsError);

	useEffect(() => {
		if (value === TabsEnum.New) {
			dispatch(loadAllPosts());
		}

		if (value === TabsEnum.Popular) {
			dispatch(loadPopularPosts());
		}
	}, [dispatch, value]);

	useEffect(() => {
		dispatch(loadTags());
	}, [dispatch]);

	const handleChange = (event: React.SyntheticEvent, newValue: TabsEnum) => {
		setValue(newValue);
	};

	return (
		<>
			<h2>Hello {user?.fullName}!</h2>

			<Tabs style={{ marginBottom: 15 }} value={value} onChange={handleChange}>
				<Tab
					aria-controls={`tabpanel-${TabsEnum.New}`}
					label={TabsEnum.New}
					value={TabsEnum.New}
				/>
				<Tab
					aria-controls={`tabpanel-${TabsEnum.Popular}`}
					label={TabsEnum.Popular}
					value={TabsEnum.Popular}
				/>
			</Tabs>

			<Grid container spacing={4}>
				<Grid xs={8} item>
					<TabPanel value={value} index={TabsEnum.New}>
						<Posts
							isLoading={postsLoading}
							error={postsError}
							userId={user?._id}
							posts={posts}
						/>
					</TabPanel>
					<TabPanel value={value} index={TabsEnum.Popular}>
						<Posts
							isLoading={postsLoading}
							error={postsError}
							userId={user?._id}
							posts={posts}
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
