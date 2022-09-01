export type loginType = {
	email: string;
	password: string;
};

export type registerType = {
	email: string;
	password: string;
	fullName: string;
	avatarUrl?: string;
};

export type userDataType = {
	_id: string;
	fullName: string;
	email: string;
	avatarUrl: string;
	createdAt: string;
	token: string;
};

export type authStateType = {
	userData: null | userDataType;
	loading: boolean;
	error: null | unknown;
	validationError: null | unknown;
};

export enum ParamsEnum {
	Password = 'password',
	Email = 'email',
	FullName = 'fullName',
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
	message: string;
};

export type AuthRequestErrorType = {
	status: number;
	data: unknown;
};
