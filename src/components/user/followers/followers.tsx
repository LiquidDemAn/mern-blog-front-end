import { FollowerType } from 'api/models/FollowerType';
import { FoundUserType } from '../../../redux/services/user/typedef';
import { FollowerCard } from '../follower-card';

type Props = {
  followers?: FollowerType[] | FoundUserType[] | null;
};

export const Followers = ({ followers }: Props) => {
  return (
    <>
      {followers && !followers.length ? <>List is Empty</> : <></>}

      {followers?.map((follower) => (
        <FollowerCard key={follower._id} follower={follower} />
      ))}
    </>
  );
};
