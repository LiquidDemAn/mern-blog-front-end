import { Button } from '@mui/material';
import { follow, unFollow } from '../../../redux/services/user/actions';
import { useAppDispach, useAppSelector } from '../../../redux/store/hooks';
import { useSelf } from 'hooks/useSelf';

type Props = {
  id?: string;
  isFullWidth?: boolean;
};

export const FollowBtn = ({ id, isFullWidth }: Props) => {
  const dispatch = useAppDispach();
  const { self } = useSelf();
  const isFollow = !!self?.following.find((item) => item._id === id);

  console.log(isFollow);
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
      variant="outlined"
      fullWidth={isFullWidth}
    >
      {isFollow ? 'Unfollow' : 'Follow'}
    </Button>
  );
};
