import { Button } from '@mui/material';
import {
	getUserNickName,
	getIsFollow,
} from '../../redux/services/user/selectors';
import { FollowerType } from '../../redux/services/user/typedef';
import { useAppSelector } from '../../redux/store/hooks';
import { AppState } from '../../redux/store/typedef';
import { UserInfo } from '../user-info';

type Props = {
	follower: FollowerType;
	onFollow: (id?: string) => void;
	onUnFollow: (id?: string) => void;
};

export const FollowerCard = ({ follower, onFollow, onUnFollow }: Props) => {
	const logedUserNickName = useAppSelector(getUserNickName);

	const isFollow = useAppSelector((state: AppState) =>
		getIsFollow(state, follower.nickName)
	);

	return (
		<>
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
		</>
	);
};
