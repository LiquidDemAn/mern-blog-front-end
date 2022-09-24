export type PostAuthorType = {
	_id: string;
	fullName: string;
	avatarUrl?: string;
};

export type PostCommentType = {
	_id: string;
	likesCount: number;
	likesIds: string[];
	author: {
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
	postsLoading: boolean;
	postsError: null | unknown;
	deleteError: null | unknown;
	deleteLoading: boolean;
};
