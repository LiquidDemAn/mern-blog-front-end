import styles from './profile-card.module.scss';
import { Avatar } from '@mui/material';
import { PathsEnum } from '../../../typedef';
import { FollowBtn } from '../follow-btn';
import { UserDataType } from '../../../redux/services/user/typedef';

type Props = {
	isLogedUser: boolean;
	user: UserDataType | null;
};

export const ProfileCard = ({ isLogedUser, user }: Props) => {
	return (
		<div>
			<Avatar
				sx={{ width: 260, height: 260 }}
				src={`${PathsEnum.Server}${user?.avatarUrl}`}
			/>

			<h1 className={styles.names}>
				<span className={styles.fullName}>{user?.fullName}</span>
				<span className={styles.nickName}>@{user?.nickName}</span>
			</h1>
			{isLogedUser ? (
				<>{/* Edit Button */}</>
			) : (
				<FollowBtn id={user?._id} isFullWidth />
			)}
		</div>
	);
};
