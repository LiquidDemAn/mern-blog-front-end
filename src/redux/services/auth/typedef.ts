export type loginType = {
	email: string;
	password: string;
};

export type registerType = {
	email: string;
	password: string;
	fullName: string;
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
	error: null;
};
