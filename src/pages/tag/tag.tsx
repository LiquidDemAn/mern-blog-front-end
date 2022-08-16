import { Tab, Tabs, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadPostsByTag } from '../../redux/services/posts/actions';
import { loadTags } from '../../redux/services/tags/actions';
import {
	getTags,
	getTagsLoading,
	getTagsError,
} from '../../redux/services/tags/selectors';
import { useAppDispach, useAppSelector } from '../../redux/store/hooks';
import { TabsEnum } from '../../typedef';
import { TabPanel } from '../../components/tab-panel';
import { Posts } from '../../components/posts';
import { Tags } from '../../components/tags';
import {
	getPostsLoading,
	getPostsError,
	getPostsByTag,
} from '../../redux/services/posts/selectors';
import { getUser } from '../../redux/services/auth/selectors';

export const Tag = () => {
	const { tag } = useParams();
	const dispatch = useAppDispach();

	const [value, setValue] = useState(TabsEnum.New);

	const user = useAppSelector(getUser);

	const postsByTag = useAppSelector(getPostsByTag);
	const postsLoading = useAppSelector(getPostsLoading);
	const postsError = useAppSelector(getPostsError);

	const tags = useAppSelector(getTags);
	const tagsLoading = useAppSelector(getTagsLoading);
	const tagsError = useAppSelector(getTagsError);

	useEffect(() => {
		if (tag) {
			if (value === TabsEnum.New) {
				dispatch(loadPostsByTag(tag));
			}
		}

		console.log(tag);
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
			<h2>#{tag}</h2>

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
							posts={postsByTag}
						/>
					</TabPanel>
					<TabPanel value={value} index={TabsEnum.Popular}>
						{/* <Posts
							isLoading={postsLoading}
							error={postsError}
							userId={user?._id}
							posts={popularPosts}
						/> */}
					</TabPanel>
				</Grid>

				<Grid xs={4} item>
					<Tags error={tagsError} tags={tags} isLoading={tagsLoading} />
				</Grid>
			</Grid>
		</div>
	);
};
