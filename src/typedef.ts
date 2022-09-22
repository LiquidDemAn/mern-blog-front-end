export type CommentType = {
	user: {
		avatarUrl: string;
		fullName: string;
	};
	text: string;
};

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
}

export enum TabsEnum {
	New = 'New',
	Popular = 'Popular',
}

export enum BreakpointsEnum {
	Small = 576,
	Medium = 768,
	Large = 992,
	Extra = 1200,
}
