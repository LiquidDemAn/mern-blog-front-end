import styles from './follower-card.module.scss';
import { Button } from '@mui/material';
import {
	getUserNickName,
	getIsFollow,
} from '../../redux/services/user/selectors';
import { FollowerType, FoundUserType } from '../../redux/services/user/typedef';
import { useAppSelector } from '../../redux/store/hooks';
import { AppState } from '../../redux/store/typedef';
import { UserInfo } from '../user-info';

type Props = {
	follower: FollowerType | FoundUserType;
	onFollow: (id?: string) => void;
	onUnFollow: (id?: string) => void;
};

export const FollowerCard = ({ follower, onFollow, onUnFollow }: Props) => {
	const logedUserNickName = useAppSelector(getUserNickName);

	const isFollow = useAppSelector((state: AppState) =>
		getIsFollow(state, follower._id)
	);

	return (
		<>
			<div className={styles.follower}>
				<UserInfo
					fullName={follower.fullName}
					nickName={follower.nickName}
					avatarUrl={follower?.avatarUrl}
				/>

				{logedUserNickName !== follower.nickName && (
					<Button
						onClick={() =>
							isFollow ? onUnFollow(follower._id) : onFollow(follower._id)
						}
						variant='outlined'
					>
						{isFollow ? 'Unfollow' : 'Follow'}
					</Button>
				)}
			</div>
		</>
	);
};
