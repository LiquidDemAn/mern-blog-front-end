export type PostAuthorType = {
	_id: string;
	fullName: string;
	avatarUrl?: string;
};

export type PostType = {
	_id: string;
	title: string;
	imageUrl?: string;
	tags: string[];
	viewsCount: number;
	author: PostAuthorType;
	createdAt: string;
};

export type FullPostType = {
	_id: string;
	title: string;
	text: string;
	imageUrl?: string;
	tags: string[];
	viewsCount: number;
	viewersId: string[];
	author: PostAuthorType;
	createdAt: string;
};

export type PostsStateType = {
	posts: PostType[];
	popularPosts: PostType[];
	selectedPost?: FullPostType | null;
	loading: boolean;
	error: null | string;
};
