import styles from './profile-card.module.scss';
import { Avatar } from '@mui/material';
import { BreakpointsEnum, PathsEnum } from 'typedef';
import FollowBtn from 'components/FollowBtn';
import { UserType } from 'api/models/UserType';

type Props = {
  isLogedUser: boolean;
  user: UserType | null;
};

export const ProfileCard = ({ isLogedUser, user }: Props) => {
  const isSmall = window.innerWidth >= BreakpointsEnum.Small;

  return (
    <div className={styles.card}>
      <Avatar
        sx={{ width: isSmall ? 260 : 130, height: isSmall ? 260 : 130 }}
        src={`${process.env.REACT_APP_API_URL || PathsEnum.Server}${
          user?.avatarUrl
        }`}
      />

      <h1 className={styles.names}>
        <span className={styles.fullName}>{user?.fullName}</span>
        <span className={styles.nickName}>@{user?.nickName}</span>
      </h1>
      {isLogedUser ? (
        <>{/* Edit Button */}</>
      ) : (
        <FollowBtn id={user?._id} isFullWidth />
      )}
    </div>
  );
};
