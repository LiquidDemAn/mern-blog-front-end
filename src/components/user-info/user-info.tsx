import styles from './user-info.module.scss';

type Props = {
	avatarUrl: string;
	fullName: string;
	additionalText: string;
};

export const UserInfo = ({ avatarUrl, fullName, additionalText }: Props) => {
	return (
		<div className={styles.root}>
			<img
				className={styles.avatar}
				src={avatarUrl || '/noavatar.png'}
				alt={fullName}
			/>
			<div className={styles.userDetails}>
				<span className={styles.userName}>{fullName}</span>
				<span className={styles.additional}>{additionalText}</span>
			</div>
		</div>
	);
};
