import { PathsEnum } from '../../typedef';
import styles from './user-info.module.scss';

type Props = {
	avatarUrl?: string;
	fullName: string;
	date: string;
};

export const UserInfo = ({ avatarUrl, fullName, date }: Props) => {
	return (
		<div className={styles.root}>
			<img
				className={styles.avatar}
				src={
					avatarUrl
						? `${PathsEnum.Server}${avatarUrl}`
						: `${PathsEnum.Server}uploads/noavatar.png`
				}
				alt='avatar'
			/>
			<div className={styles.userDetails}>
				<span className={styles.userName}>{fullName}</span>

				<span className={styles.additional}>
					{new Date(date).toDateString()}
				</span>
			</div>
		</div>
	);
};
