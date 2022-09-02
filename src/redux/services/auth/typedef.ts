export type LoginType = {
	email: string;
	password: string;
};

export type RegisterType = {
	email: string;
	password: string;
	fullName: string;
	nickName: string;
	avatarUrl?: string;
};

export type UserDataType = {
	_id: string;
	fullName: string;
	email: string;
	avatarUrl: string;
	createdAt: string;
	token: string;
};

export type AuthStateType = {
	userData: null | UserDataType;
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

export type AuthValidtionErrorType = {
	status: number;
	data: {
		param?: ParamsEnum;
	}[];
};

export type AuthErrorType = {
	status: number;
	data: {
		message: string;
		param?: string;
	};
};
