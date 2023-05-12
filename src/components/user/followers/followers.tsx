import { FollowerType } from 'api/models/FollowerType';
import { FollowerCard } from '../follower-card';
import { SearchingUserType } from 'api/models/UserType';

type Props = {
  followers?: FollowerType[] | SearchingUserType[] | null;
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
