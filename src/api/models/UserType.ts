import { FollowerType } from 'api/models/FollowerType';

export type UserType = {
  _id: string;
  fullName: string;
  nickName: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
  followers: FollowerType[];
  following: FollowerType[];
  token?: string;
};

export type SearchingUserType = {
  _id: string;
  nickName: string;
  fullName: string;
  avatarUrl: string;
};

export enum FindUsersEnum {
  NickName = 'nickname',
  FullName = 'fullname'
}

export type SearchingUsersRequest = {
  searchType: FindUsersEnum;
  value: string;
};
