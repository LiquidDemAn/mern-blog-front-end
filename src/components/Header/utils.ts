import { LinkItem, PathsEnum } from '../../typedef';
import { UserType } from '../../api/models/UserType';

type Props = {
  isAuth: boolean;
  self: UserType | null;
};

export const getMenuItems = ({ isAuth, self }: Props): LinkItem[] => {
  if (isAuth && self) {
    return [
      { label: 'Profile', to: self.nickName },
      { label: 'Write a post', to: PathsEnum.CreatePost }
    ];
  } else {
    return [
      { label: 'Log in', to: PathsEnum.Login },
      { label: 'Create account', to: PathsEnum.Register }
    ];
  }
};
