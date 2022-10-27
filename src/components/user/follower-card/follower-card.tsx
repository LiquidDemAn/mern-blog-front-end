import styles from './follower-card.module.scss';
import { getUserNickName } from '../../../redux/services/user/selectors';
import { FollowerType, FoundUserType } from '../../../redux/services/user/typedef';
import { useAppSelector } from '../../../redux/store/hooks';
import { UserInfo } from '../user-info';
import { FollowBtn } from '../follow-btn';

type Props = {
	follower: FollowerType | FoundUserType;
};

export const FollowerCard = ({ follower }: Props) => {
	const logedUserNickName = useAppSelector(getUserNickName);

	return (
		<>
			<div className={styles.follower}>
				<UserInfo
					fullName={follower.fullName}
					nickName={follower.nickName}
					avatarUrl={follower?.avatarUrl}
				/>

				{logedUserNickName !== follower.nickName && (
					<FollowBtn id={follower._id} />
				)}
			</div>
		</>
	);
};
