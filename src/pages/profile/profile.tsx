import styles from './profile.module.scss';
import { Avatar, Button, Tab, Tabs, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import {
	getIsFollow,
	getUser,
	getUserError,
	getUserLoading,
} from '../../redux/services/user/selectors';
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
import { follow, unFollow } from '../../redux/services/user/actions';
import { ErrorDialog } from '../../components/dialogs/error';
import { FollowerCard } from '../../components/follower-card';
import { AppState } from '../../redux/store/typedef';
import { Loader } from '../../components/loader';

export const Profile = () => {
	const { nickName } = useParams();
	const dispatch = useAppDispach();

	const [tabValue, setTabValue] = useState(TabsEnum.Posts);
	const [user, setUser] = useState<UserDataType | null>(null);
	const [openError, setOpenError] = useState(false);

	const posts = useAppSelector(getPosts);
	const postsLoading = useAppSelector(getPostsLoading);
	const postsError = useAppSelector(getPostsError);

	const logedUser = useAppSelector(getUser);
	const logedUserError = useAppSelector(getUserError);
	const logedUserLoading = useAppSelector(getUserLoading);

	const isFollow = useAppSelector((state: AppState) =>
		getIsFollow(state, user?._id)
	);

	const isLogedUser = nickName === logedUser?.nickName;

	const onFollow = (id?: string) => {
		if (id) {
			dispatch(follow(id));
		}
	};

	const onUnFollow = (id?: string) => {
		if (id) {
			dispatch(unFollow(id));
		}
	};

	const handleChange = (event: SyntheticEvent, newValue: TabsEnum) => {
		setTabValue(newValue);
	};

	const handleErrorClose = () => {
		setOpenError(false);
	};

	useEffect(() => {
		setTabValue(TabsEnum.Posts);
	}, [nickName]);

	useEffect(() => {
		if (user?._id) {
			dispatch(loadPosts(`/posts/users/${user._id}`));
		}
	}, [dispatch, user?._id]);

	useEffect(() => {
		if (isLogedUser) {
			setUser(logedUser);
		} else {
			(async () => {
				await customeAxios
					.get(`/users/${nickName}`)
					.then(({ data }) => {
						setUser(data);
					})
					.catch((err: AxiosError) => {
						console.log(err);
					});
			})();
		}
	}, [isLogedUser, nickName, logedUser?.nickName, logedUser]);

	return (
		<>
			<div className={styles.profile}>
				<div>
					<Avatar
						sx={{ width: 260, height: 260 }}
						src={`${PathsEnum.Server}${
							isLogedUser ? logedUser?.avatarUrl : user?.avatarUrl
						}`}
					/>

					<h1 className={styles.names}>
						<span className={styles.fullName}>
							{isLogedUser ? logedUser?.fullName : user?.fullName}
						</span>
						<span className={styles.nickName}>
							@{isLogedUser ? logedUser?.nickName : user?.nickName}
						</span>
					</h1>
					{isLogedUser ? (
						<Button variant='outlined' fullWidth>
							Edit profile
						</Button>
					) : (
						<Button
							onClick={() =>
								isFollow ? onUnFollow(user?._id) : onFollow(user?._id)
							}
							variant='outlined'
							fullWidth
						>
							{isFollow ? 'Unfollow' : 'Follow'}
						</Button>
					)}
				</div>

				<main className={styles.main}>
					<Tabs
						className={styles.tabs}
						value={tabValue}
						onChange={handleChange}
					>
						<Tab
							aria-controls={`tabpanel-${TabsEnum.Posts}`}
							label={TabsEnum.Posts}
							value={TabsEnum.Posts}
						/>
						<Tab
							aria-controls={`tabpanel-${TabsEnum.Followers}`}
							label={`${TabsEnum.Followers} (${user?.followers.length})`}
							value={TabsEnum.Followers}
						/>
						<Tab
							aria-controls={`tabpanel-${TabsEnum.Following}`}
							label={`${TabsEnum.Following} (${user?.following.length})`}
							value={TabsEnum.Following}
						/>
					</Tabs>

					<Grid>
						<TabPanel value={tabValue} index={TabsEnum.Posts}>
							<Posts
								error={postsError}
								isLoading={postsLoading}
								posts={posts}
							/>
						</TabPanel>

						<TabPanel value={tabValue} index={TabsEnum.Followers}>
							<>
								{!user?.followers.length && <>List is Empty</>}

								{user?.followers.map((follower) => (
									<FollowerCard
										follower={follower}
										onFollow={onFollow}
										onUnFollow={onUnFollow}
									/>
								))}
							</>
						</TabPanel>

						<TabPanel value={tabValue} index={TabsEnum.Following}>
							<>
								{!user?.following.length && <>List is Empty</>}

								{user?.following.map((follower) => (
									<FollowerCard
										follower={follower}
										onFollow={onFollow}
										onUnFollow={onUnFollow}
									/>
								))}
							</>
						</TabPanel>
					</Grid>
				</main>
			</div>

			{logedUserError && (
				<ErrorDialog open={openError} handleClose={handleErrorClose} />
			)}

			<Loader open={logedUserLoading} />
		</>
	);
};
