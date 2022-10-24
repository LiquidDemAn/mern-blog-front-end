import { Button } from '@mui/material';
import { follow, unFollow } from '../../redux/services/user/actions';
import { getIsFollow } from '../../redux/services/user/selectors';
import { useAppDispach, useAppSelector } from '../../redux/store/hooks';
import { AppState } from '../../redux/store/typedef';

type Props = {
	id?: string;
	isFullWidth?: boolean;
};

export const FollowBtn = ({ id, isFullWidth }: Props) => {
	const dispatch = useAppDispach();
	const isFollow = useAppSelector((state: AppState) => getIsFollow(state, id));

	const onFollow = () => {
		if (id) {
			dispatch(follow(id));
		}
	};

	const onUnFollow = () => {
		if (id) {
			dispatch(unFollow(id));
		}
	};

	return (
		<Button
			onClick={isFollow ? onUnFollow : onFollow}
			variant='outlined'
			fullWidth={isFullWidth}
		>
			{isFollow ? 'Unfollow' : 'Follow'}
		</Button>
	);
};
