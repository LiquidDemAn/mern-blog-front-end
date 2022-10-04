import styles from './profile.module.scss';
import { Avatar } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getIsAuth, getUser } from '../../redux/services/user/selectors';
import { useAppSelector } from '../../redux/store/hooks';
import { PathsEnum } from '../../typedef';

export const Profile = () => {
	const { nickName } = useParams();

	const user = useAppSelector(getUser);
	const isAuth = useAppSelector(getIsAuth);
	const isUserProfile = nickName === user?.nickName;

	return (
		<>
			<div>
				{user?.avatarUrl ? (
					<Avatar
						sx={{ width: 260, height: 260 }}
						src={`${PathsEnum.Server}${user?.avatarUrl}`}
					/>
				) : (
					<Avatar sx={{ width: 260, height: 260 }} />
				)}
			</div>

			<h1 className={styles.names}>
				<span className={styles.fullName}>{user?.fullName}</span>
				<span className={styles.nickName}>@{user?.nickName}</span>
			</h1>
		</>
	);
};
