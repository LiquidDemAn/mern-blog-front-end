import styles from './follower-card.module.scss';
import {
  FollowerType,
  FoundUserType
} from '../../../redux/services/user/typedef';
import { UserInfo } from '../user-info';
import { FollowBtn } from '../follow-btn';
import { useSelf } from 'hooks/useSelf';

type Props = {
  follower: FollowerType | FoundUserType;
};

export const FollowerCard = ({ follower }: Props) => {
  const { self } = useSelf();

  return (
    <>
      <div className={styles.follower}>
        <UserInfo
          fullName={follower.fullName}
          nickName={follower.nickName}
          avatarUrl={follower?.avatarUrl}
        />

        {self?.nickName !== follower.nickName && (
          <FollowBtn id={follower._id} />
        )}
      </div>
    </>
  );
};
