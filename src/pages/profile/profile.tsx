import styles from './profile.module.scss';
import {
	Avatar,
	Button,
	Tab,
	Tabs,
	Grid,
	TextField,
	Select,
	MenuItem,
	SelectChangeEvent,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import {
	getIsFollow,
	getUser,
	getUserError,
	getUserLoading,
} from '../../redux/services/user/selectors';
import { useAppDispach, useAppSelector } from '../../redux/store/hooks';
import { FindUsersEnum, PathsEnum, TabsEnum } from '../../typedef';
import { FormEvent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { FoundUserType, UserDataType } from '../../redux/services/user/typedef';
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
import { follow, loadUser, unFollow } from '../../redux/services/user/actions';
import { ErrorDialog } from '../../components/dialogs/error';
import { FollowerCard } from '../../components/follower-card';
import { AppState } from '../../redux/store/typedef';
import { Loader } from '../../components/loader';

export const Profile = () => {
	const { nickName } = useParams();
	const dispatch = useAppDispach();
	const navigate = useNavigate();

	const [selectValue, setSelectValue] = useState(FindUsersEnum.NickName);
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

	const findRef = useRef<HTMLInputElement | null>(null);

	const isFollow = useAppSelector((state: AppState) =>
		getIsFollow(state, user?._id)
	);

	const isLogedUser = nickName === logedUser?.nickName;

	const onSelectChange = (event: SelectChangeEvent) => {
		setSelectValue(event.target.value as FindUsersEnum);
	};

	const onFind = async (event: FormEvent) => {
		event.preventDefault();

		const value = findRef.current?.value;

		if (value) {
			setFoundUsersLoading(true);

			if (selectValue === FindUsersEnum.NickName) {
				customeAxios
					.get(`/users/findByNickName/${value}`)
					.then(({ data }) => {
						setFoundUsers(data);
						setFoundUsersLoading(false);
					})
					.catch((err) => {
						console.log(err);
						setFoundUsersLoading(false);
					});
			} else {
				customeAxios
					.get(`/users/findByFullName/${value}`)
					.then(({ data }) => {
						setFoundUsers(data);
						setFoundUsersLoading(false);
					})
					.catch((err) => {
						console.log(err);
						setFoundUsersLoading(false);
					});
			}
		}
	};

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
									<FollowerCard
										follower={follower}
										onFollow={onFollow}
										onUnFollow={onUnFollow}
									/>
								))}
							</>
						</TabPanel>

						{/* Following */}
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

						{/* Find Person */}
						{isLogedUser && (
							<TabPanel value={tabValue} index={TabsEnum.FindPerson}>
								<div className={styles.select}>
									<label>Search by:</label>
									<Select
										displayEmpty
										value={selectValue}
										onChange={onSelectChange}
										id='find-users-select'
										size='small'
									>
										<MenuItem value={FindUsersEnum.NickName}>
											{FindUsersEnum.NickName}
										</MenuItem>
										<MenuItem value={FindUsersEnum.FullName}>
											{FindUsersEnum.FullName}
										</MenuItem>
									</Select>
								</div>

								<form onSubmit={onFind} className={styles.search}>
									<TextField
										inputRef={findRef}
										id='find-person'
										label={
											selectValue === FindUsersEnum.NickName
												? 'Enter nickname'
												: 'Enter fullname'
										}
										variant='outlined'
										size='small'
										fullWidth
									/>
									<Button onClick={onFind} variant='contained'>
										Find
									</Button>
								</form>
								<>
									{foundUsers && !foundUsers.length ? (
										<span>List is Empty</span>
									) : (
										<></>
									)}
									{foundUsers?.map((user) => (
										<FollowerCard
											follower={user}
											onFollow={onFollow}
											onUnFollow={onUnFollow}
										/>
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
