export type PostAuthorType = {
	_id: string;
	fullName: string;
	nickName: string;
	avatarUrl?: string;
};

export type PostCommentType = {
	_id: string;
	likesCount: number;
	likesIds: string[];
	text: string;
	author: {
		_id: string;
		fullName: string;
		nickName: string;
		avatarUrl: string;
		createdAt: string;
	};
};

export type PostType = {
	_id: string;
	title: string;
	imageUrl?: string;
	tags: string[];
	viewsCount: number;
	viewersIds: string[];
	likesCount: number;
	likesIds: string[];
	comments: PostCommentType[];
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
	viewersIds: string[];
	likesCount: number;
	likesIds: string[];
	comments: PostCommentType[];
	author: PostAuthorType;
	createdAt: string;
};

export type PostsStateType = {
	posts: PostType[];
	loading: boolean;
	postsError: null | unknown;
	postError: null | unknown;
	commentError: null | unknown;
};
