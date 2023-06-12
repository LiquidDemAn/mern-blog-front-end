import { FC } from 'react';
import { useSelf } from 'hooks/useSelf';
import { Button } from '@mui/material';
import { Props } from './types';
import { useApi } from 'components/FollowBtn/useApi';

const FollowBtn: FC<Props> = ({ id, isFullWidth }) => {
  const { self } = useSelf();
  const isFollow = !!self?.following.find((item) => item._id === id);

  const { follow, unFollow } = useApi();

  const onFollow = () => {
    if (id) {
      follow.mutate(id);
    }
  };

  const onUnFollow = () => {
    if (id) {
      unFollow.mutate(id);
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

export default FollowBtn;
