import styles from './profile.module.scss';
import { Avatar, Button, Tab, Tabs } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getUser } from '../../redux/services/user/selectors';
import { useAppSelector } from '../../redux/store/hooks';
import { PathsEnum, TabsEnum } from '../../typedef';
import { SyntheticEvent, useEffect, useState } from 'react';
import { UserDataType } from '../../redux/services/user/typedef';
import { customeAxios } from '../../redux/axios';
import { AxiosError } from 'axios';

export const Profile = () => {
	const { nickName } = useParams();

	const [value, setValue] = useState(TabsEnum.Posts);

	const thisUser = useAppSelector(getUser);
	const isThisUser = nickName === thisUser?.nickName;

	const [user, setUser] = useState<UserDataType | null>(null);

	const handleChange = (event: SyntheticEvent, newValue: TabsEnum) => {
		setValue(newValue);
	};

	useEffect(() => {
		if (!thisUser) {
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
	}, [thisUser, nickName]);

	return (
		<div className={styles.profile}>
			<div>
				<Avatar
					sx={{ width: 260, height: 260 }}
					src={`${PathsEnum.Server}${
						isThisUser ? thisUser?.avatarUrl : user?.avatarUrl
					}`}
				/>

				<h1 className={styles.names}>
					<span className={styles.fullName}>
						{isThisUser ? thisUser?.fullName : user?.fullName}
					</span>
					<span className={styles.nickName}>
						@{isThisUser ? thisUser?.nickName : user?.nickName}
					</span>
				</h1>
				{isThisUser ? (
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
