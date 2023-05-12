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
