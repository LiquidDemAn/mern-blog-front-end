export type ErrorType = {
	status?: number;
	message?: string;
};

export enum PathsEnum {
	Server = 'http://localhost:4444/',
	Home = '/',
	Register = 'register',
	Login = '/login',
	FullPost = 'posts/:id',
	EditPost = 'posts/:id/edit',
	CreatePost = 'create/post',
	Tag = 'tags/:tag',
	Profile = ':nickName',
}

export enum TabsEnum {
	New = 'New',
	Popular = 'Popular',
	Posts = 'Posts',
	Followers = 'Followers',
	Following = 'Following',
	FindPerson = 'Find Person',
}

export enum FindUsersEnum {
	NickName = 'nickname',
	FullName = 'fullname',
}

export enum BreakpointsEnum {
	Small = 576,
	Medium = 768,
	Large = 992,
	Extra = 1200,
}
