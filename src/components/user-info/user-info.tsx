import { PathsEnum } from '../../typedef';
import styles from './user-info.module.scss';

type Props = {
	fullName: string;
	avatarUrl?: string;
	date?: string;
	nickName?: string;
};

export const UserInfo = ({ avatarUrl, fullName, date, nickName }: Props) => {
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
					{date && new Date(date).toDateString()}
					{nickName && nickName}
				</span>
			</div>
		</div>
	);
};
