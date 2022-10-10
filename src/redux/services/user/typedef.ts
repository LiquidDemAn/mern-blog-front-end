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
	followers: string[];
	following: string[];
	token: string;
};

export type UserStateType = {
	data: null | UserDataType;
	loading: boolean;
	error: null | unknown;
	validationError: null | unknown;
};

export enum ParamsEnum {
	Password = 'password',
	Email = 'email',
	FullName = 'fullName',
	NickName = 'nickName',
	AvatarUrl = 'avatarUrl',
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
