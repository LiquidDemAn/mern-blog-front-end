import { Tabs, Tab, Grid } from '@mui/material';
import { SyntheticEvent } from 'react';
import { Posts } from '../../../components/posts';
import { TabPanel } from '../../../components/tab-panel';
import { Tags } from '../../../components/tags';
import { PostType } from '../../../redux/services/posts/typedef';
import { ErrorType, TabsEnum } from '../../../typedef';

type Props = {
	userId?: string;
	userName?: string;
	value: TabsEnum;
	postsLoading: boolean;
	tagsLoading: boolean;
	postsError: ErrorType | null;
	tagsError: ErrorType | null;
	posts: PostType[];
	tags: string[];
	handleChange: (event: SyntheticEvent, newValue: TabsEnum) => void;
};

export const TagView = ({
	userId,
	value,
	postsLoading,
	tagsLoading,
	postsError,
	tagsError,
	posts,
	tags,
	handleChange,
}: Props) => {
	return (
		<>
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
							userId={userId}
							posts={posts}
						/>
					</TabPanel>
					<TabPanel value={value} index={TabsEnum.Popular}>
						<Posts
							isLoading={postsLoading}
							error={postsError}
							userId={userId}
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
