export type CommentType = {
	user: {
		avatarUrl: string;
		fullName: string;
	};
	text: string;
};

export type ErrorType = {
	status: number;
	message?: string;
};

export enum TabsEnum {
	New = 'New',
	Popular = 'Popular',
}
