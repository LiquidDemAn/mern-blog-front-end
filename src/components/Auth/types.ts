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

export enum AuthRequestType {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  GETSELF = 'GETSELF'
}
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
