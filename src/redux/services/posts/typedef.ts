export type postAuthor = {
	_id: string;
	fullName: string;
	avatarUrl?: string;
};

export type PostType = {
	_id: string;
	title: string;
	text: string;
	tags: string[];
	viewsCount: number;
	viewersId: string[];
	author: postAuthor;
	createdAt: string;
};

export type PostsStateType = {
	posts: PostType[];
	selectedPost?: PostType;
	loading: boolean;
	error: null | string;
};
