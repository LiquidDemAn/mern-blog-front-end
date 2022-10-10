import styles from './profile.module.scss';
import { Avatar, Button, Tab, Tabs, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getUser } from '../../redux/services/user/selectors';
import { useAppDispach, useAppSelector } from '../../redux/store/hooks';
import { PathsEnum, TabsEnum } from '../../typedef';
import { SyntheticEvent, useEffect, useState } from 'react';
import { UserDataType } from '../../redux/services/user/typedef';
import { customeAxios } from '../../redux/axios';
import { AxiosError } from 'axios';
import { loadPosts } from '../../redux/services/posts/actions';
import {
	getPosts,
	getPostsLoading,
	getPostsError,
} from '../../redux/services/posts/selectors';
import { TabPanel } from '../../components/tab-panel';
import { Posts } from '../../components/posts';

export const Profile = () => {
	const { nickName } = useParams();

	const dispatch = useAppDispach();
	const logedUser = useAppSelector(getUser);
	const posts = useAppSelector(getPosts);
	const postsLoading = useAppSelector(getPostsLoading);
	const postsError = useAppSelector(getPostsError);

	const [tabValue, setTabValue] = useState(TabsEnum.Posts);
	const [anotherUser, setAnotherUser] = useState<UserDataType | null>(null);

	const isLogedUser = nickName === logedUser?.nickName;

	const handleChange = (event: SyntheticEvent, newValue: TabsEnum) => {
		setTabValue(newValue);
	};

	console.log(logedUser);

	useEffect(() => {
		if (isLogedUser && logedUser?._id) {
			dispatch(loadPosts(`/posts/users/${logedUser._id}`));
		} else if (anotherUser?._id) {
			dispatch(loadPosts(`/posts/users/${anotherUser._id}`));
		}
	}, [dispatch, logedUser?._id, anotherUser?._id, isLogedUser]);

	useEffect(() => {
		if (!isLogedUser) {
			(async () => {
				await customeAxios
					.get(`/users/${nickName}`)
					.then(({ data }) => {
						setAnotherUser(data);
					})
					.catch((err: AxiosError) => {
						console.log(err);
					});
			})();
		}
	}, [isLogedUser, nickName]);

	return (
		<div className={styles.profile}>
			<div>
				<Avatar
					sx={{ width: 260, height: 260 }}
					src={`${PathsEnum.Server}${
						isLogedUser ? logedUser?.avatarUrl : anotherUser?.avatarUrl
					}`}
				/>

				<h1 className={styles.names}>
					<span className={styles.fullName}>
						{isLogedUser ? logedUser?.fullName : anotherUser?.fullName}
					</span>
					<span className={styles.nickName}>
						@{isLogedUser ? logedUser?.nickName : anotherUser?.nickName}
					</span>
				</h1>
				{isLogedUser ? (
					<Button variant='outlined' fullWidth>
						Edit profile
					</Button>
				) : (
					<Button variant='outlined' fullWidth>
						Follow
					</Button>
				)}
			</div>

			<main className={styles.main}>
				<Tabs className={styles.tabs} value={tabValue} onChange={handleChange}>
					<Tab
						aria-controls={`tabpanel-${TabsEnum.Posts}`}
						label={TabsEnum.Posts}
						value={TabsEnum.Posts}
					/>
					<Tab
						aria-controls={`tabpanel-${TabsEnum.Followers}`}
						label={TabsEnum.Followers}
						value={TabsEnum.Followers}
					/>
					<Tab
						aria-controls={`tabpanel-${TabsEnum.Following}`}
						label={TabsEnum.Following}
						value={TabsEnum.Following}
					/>
				</Tabs>

				<Grid>
					<TabPanel value={tabValue} index={TabsEnum.Posts}>
						<Posts error={postsError} isLoading={postsLoading} posts={posts} />
					</TabPanel>
				</Grid>
			</main>
		</div>
	);
};
