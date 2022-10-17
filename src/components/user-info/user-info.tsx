import { Avatar } from '@mui/material';
import { PathsEnum } from '../../typedef';
import styles from './user-info.module.scss';

type Props = {
	fullName?: string;
	avatarUrl?: string;
	date?: string;
	nickName?: string;
};

export const UserInfo = ({ avatarUrl, fullName, date, nickName }: Props) => {
	return (
		<div className={styles.root}>
			{avatarUrl ? (
				<Avatar
					className={styles.avatar}
					src={PathsEnum.Server + avatarUrl}
					alt={fullName}
				/>
			) : (
				<Avatar className={styles.avatar} alt='avatar' />
			)}

			<div className={styles.userDetails}>
				<span className={styles.userName}>{fullName}</span>

				<span className={styles.additional}>
					{date && new Date(date).toDateString()}
					{nickName && nickName}
				</span>
			</div>
		</div>
	);
};
