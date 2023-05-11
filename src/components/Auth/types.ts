import { FollowerType } from 'api/models/FollowerType';

export type LoginType = {
  email: string;
  password: string;
};

export type RegisterType = {
  email: string;
  password: string;
  fullName: string;
  nickName: string;
  avatarUrl: string;
};

export type UserDataType = {
  _id: string;
  fullName: string;
  nickName: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
  followers: FollowerType[];
  following: FollowerType[];
  token: string;
};

export enum ParamsEnum {
  Password = 'password',
  Email = 'email',
  FullName = 'fullName',
  NickName = 'nickName',
  AvatarUrl = 'avatarUrl'
}

export type UserValidtionErrorType = {
  status: number;
  data: {
    param: ParamsEnum;
  }[];
};

export type UserErrorType = {
  status: number;
  data: {
    message: string;
    param?: string;
  };
};

export type FoundUserType = {
  _id: string;
  nickName: string;
  fullName: string;
  avatarUrl: string;
};
