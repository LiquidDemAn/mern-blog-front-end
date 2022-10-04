import styles from './profile.module.scss';
import { Avatar, Button, Tab, Tabs } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getIsAuth, getUser } from '../../redux/services/user/selectors';
import { useAppSelector } from '../../redux/store/hooks';
import { PathsEnum, TabsEnum } from '../../typedef';
import { SyntheticEvent, useState } from 'react';

export const Profile = () => {
	const { nickName } = useParams();

	const [value, setValue] = useState(TabsEnum.Posts);

	const user = useAppSelector(getUser);
	const isAuth = useAppSelector(getIsAuth);
	const isUserProfile = nickName === user?.nickName;

	const handleChange = (event: SyntheticEvent, newValue: TabsEnum) => {
		setValue(newValue);
	};

	return (
		<div className={styles.profile}>
			<div>
				{user?.avatarUrl ? (
					<Avatar
						sx={{ width: 260, height: 260 }}
						src={`${PathsEnum.Server}${user?.avatarUrl}`}
					/>
				) : (
					<Avatar sx={{ width: 260, height: 260 }} />
				)}

				<h1 className={styles.names}>
					<span className={styles.fullName}>{user?.fullName}</span>
					<span className={styles.nickName}>@{user?.nickName}</span>
				</h1>

				{isAuth ? (
					<Button variant='outlined' fullWidth>
						Edit profile
					</Button>
				) : (
					<Button variant='outlined' fullWidth>
						Follow
					</Button>
				)}
			</div>

			<div>
				<Tabs value={value} onChange={handleChange}>
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
			</div>
		</div>
	);
};
