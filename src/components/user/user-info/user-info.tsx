import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { PathsEnum } from '../../../typedef';
import styles from './user-info.module.scss';

type Props = {
	fullName?: string;
	avatarUrl?: string;
	date?: string;
	nickName?: string;
	text?: string;
};

export const UserInfo = ({
	avatarUrl,
	fullName,
	date,
	nickName,
	text,
}: Props) => {
	return (
		<Link to={PathsEnum.Home + nickName} className={styles.root}>
			{avatarUrl ? (
				<Avatar
					className={styles.avatar}
					src={(process.env.REACT_APP_API_URL || PathsEnum.Server) + avatarUrl}
					alt={fullName}
				/>
			) : (
				<Avatar className={styles.avatar} alt='avatar' />
			)}

			<div className={styles.userDetails}>
				<span className={styles.userName}>{fullName}</span>

				<div className={styles.additional}>
					{nickName && <span>@{nickName}</span>}
					{date && <span>{new Date(date).toDateString()}</span>}
					{text && <span>{text}</span>}
				</div>
			</div>
		</Link>
	);
};
