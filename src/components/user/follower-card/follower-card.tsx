import styles from './follower-card.module.scss';
import { UserInfo } from '../user-info';
import { useSelf } from 'hooks/useSelf';
import FollowBtn from 'components/FollowBtn';
import { FollowerType } from 'api/models/FollowerType';
import { SearchingUserType } from 'api/models/UserType';

type Props = {
  follower: FollowerType | SearchingUserType;
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
