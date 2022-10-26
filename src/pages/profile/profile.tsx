import styles from './profile.module.scss';
import { Tab, Tabs, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import {
	getUser,
	getUserError,
	getUserLoading,
} from '../../redux/services/user/selectors';
import { useAppDispach, useAppSelector } from '../../redux/store/hooks';
import { TabsEnum } from '../../typedef';
import { SyntheticEvent, useEffect, useState } from 'react';
import { FoundUserType, UserDataType } from '../../redux/services/user/typedef';
import { AxiosError } from 'axios';
import { loadPosts } from '../../redux/services/posts/actions';
import {
	getPosts,
	getPostsLoading,
	getPostsError,
} from '../../redux/services/posts/selectors';
import { TabPanel } from '../../components/tab-panel';
import { Posts } from '../../components/posts';
import { loadUser } from '../../redux/services/user/actions';
import { ErrorDialog } from '../../components/dialogs/error';
import { FollowerCard } from '../../components/follower-card';
import { Loader } from '../../components/loader';
import { ProfileCard } from '../../components/profile-card';
import { UsersSearch } from '../../components/users-search';

export const Profile = () => {
	const { nickName } = useParams();
	const dispatch = useAppDispach();
	const navigate = useNavigate();

	const [tabValue, setTabValue] = useState(TabsEnum.FindPerson);
	const [user, setUser] = useState<UserDataType | null>(null);
	const [openError, setOpenError] = useState(false);
	const [foundUsers, setFoundUsers] = useState<FoundUserType[] | null>(null);
	const [profileError, setProfileError] = useState<AxiosError | null>(null);
	const [foundUsersLoading, setFoundUsersLoading] = useState(false);

	const posts = useAppSelector(getPosts);
	const postsLoading = useAppSelector(getPostsLoading);
	const postsError = useAppSelector(getPostsError);

	const logedUser = useAppSelector(getUser);
	const logedUserError = useAppSelector(getUserError);
	const logedUserLoading = useAppSelector(getUserLoading);

	const isLogedUser = nickName === logedUser?.nickName;

	const handleChange = (event: SyntheticEvent, newValue: TabsEnum) => {
		setTabValue(newValue);
	};

	const handleErrorClose = () => {
		setOpenError(false);
		setProfileError(null);
	};

	useEffect(() => {
		if (profileError) {
			setOpenError(true);
			navigate(`/${logedUser?.nickName}`);
		}
	}, [profileError, logedUser?.nickName, navigate]);

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
		} else if (nickName) {
			dispatch(loadUser({ nickName, setUser, setProfileError }));
		}
	}, [isLogedUser, nickName, logedUser, dispatch]);

	return (
		<>
			<div className={styles.profile}>
				<ProfileCard user={user} isLogedUser={isLogedUser} />

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

						{isLogedUser && (
							<Tab
								aria-controls={`tabpanel-${TabsEnum.FindPerson}`}
								label={`${TabsEnum.FindPerson} ${
									foundUsers ? `(${foundUsers.length})` : ''
								} `}
								value={TabsEnum.FindPerson}
							/>
						)}
					</Tabs>

					<Grid>
						{/* Posts */}
						<TabPanel value={tabValue} index={TabsEnum.Posts}>
							<Posts
								error={postsError}
								isLoading={postsLoading}
								posts={posts}
							/>
						</TabPanel>

						{/* Followers */}
						<TabPanel value={tabValue} index={TabsEnum.Followers}>
							<>
								{!user?.followers.length && <>List is Empty</>}

								{user?.followers.map((follower) => (
									<FollowerCard key={follower._id} follower={follower} />
								))}
							</>
						</TabPanel>

						{/* Following */}
						<TabPanel value={tabValue} index={TabsEnum.Following}>
							<>
								{!user?.following.length && <>List is Empty</>}

								{user?.following.map((follower) => (
									<FollowerCard key={follower._id} follower={follower} />
								))}
							</>
						</TabPanel>

						{/* Find Person */}
						{isLogedUser && (
							<TabPanel value={tabValue} index={TabsEnum.FindPerson}>
								<UsersSearch
									setData={setFoundUsers}
									setError={setProfileError}
									setLoading={setFoundUsersLoading}
								/>

								<>
									{foundUsers && !foundUsers.length ? (
										<span>List is Empty</span>
									) : (
										<></>
									)}
									{foundUsers?.map((user) => (
										<FollowerCard key={user._id} follower={user} />
									))}
								</>
							</TabPanel>
						)}
					</Grid>
				</main>
			</div>

			{(profileError || logedUserError) && (
				<ErrorDialog open={openError} handleClose={handleErrorClose} />
			)}

			<Loader open={logedUserLoading || foundUsersLoading} />
		</>
	);
};
