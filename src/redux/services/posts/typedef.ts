export type postAuthor = {
	_id: string;
	fullName: string;
	avatarUrl?: string;
};

export type PostType = {
	_id: string;
	title: string;
	text: string;
	imageUrl?: string;
	tags: string[];
	viewsCount: number;
	viewersId: string[];
	author: postAuthor;
	createdAt: string;
};

export type PostsStateType = {
	posts: PostType[];
	selectedPost?: PostType | null;
	loading: boolean;
	error: null | string;
};
