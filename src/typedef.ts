export type PostType = {
	_id: number;
	title: string;
	createdAt: string;
	imageUrl?: string;
	user: {
		avatarUrl: string;
		fullName: string;
	};
	viewsCount: number;
	commentsCount: number;
	tags: string[];
};

export type CommentType = {
	user: {
		avatarUrl: string;
		fullName: string;
	};
	text: string;
};
