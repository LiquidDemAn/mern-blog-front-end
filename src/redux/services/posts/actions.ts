import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { customeAxios } from '../../axios';
import { FullPostType, PostType } from './typedef';
import { UserStateType } from '../user/typedef';

export const loadPosts = createAsyncThunk<PostType[], string>(
	'posts/load-posts',
	async (url, { rejectWithValue }) => {
		try {
			const response = await customeAxios.get(url);
			return await response.data;
		} catch (err) {
			const error = err as AxiosError;

			return rejectWithValue({
				status: error.response?.status,
				message: error.message,
			});
		}
	}
);

export const loadPost = createAsyncThunk<
	void,
	{
		id?: string;
		setPost: (value: FullPostType) => void;
		setPostError: (value: AxiosError) => void;
	}
>('posts/load-post', async ({ id, setPost, setPostError }) => {
	try {
		if (id) {
			const { data } = await customeAxios.get(`/posts/${id}`);
			setPost(data);
		}
	} catch (err) {
		console.log(err);

		setPostError(err as AxiosError);
	}
});

export const deletePost = createAsyncThunk(
	'posts/delete-post',
	async (id: string, { rejectWithValue }) => {
		try {
			await customeAxios.delete(`/posts/${id}`);
		} catch (err) {
			const error = err as AxiosError;

			return rejectWithValue({
				status: error.response?.status,
				message: error.message,
			});
		}
	}
);

export const likePost = createAsyncThunk<string | undefined, string>(
	'posts/like-post',
	async (id, { getState }) => {
		const { user } = getState() as { user: UserStateType };
		const userId = user.data?._id;

		try {
			await customeAxios.patch(`/posts/${id}/like`);
			return userId;
		} catch (err) {
			console.log(err);
		}
	}
);

export const likeFullPost = createAsyncThunk<
	void,
	{
		post: FullPostType;
		setPost: (value: FullPostType) => void;
	}
>('posts/like-full-post', async ({ post, setPost }, { getState }) => {
	const { user } = getState() as { user: UserStateType };
	const userId = user.data?._id;

	try {
		if (userId) {
			await customeAxios.patch(`/posts/${post._id}/like`);

			setPost({
				...post,
				likesIds: [...post.likesIds, userId],
				likesCount: post.likesCount + 1,
			});
		}
	} catch (err) {
		console.log(err);
	}
});

export const unlikePost = createAsyncThunk<
	string | undefined,
	{
		postId?: string;
		post?: FullPostType | null;
		setPost?: (value: FullPostType | null) => void;
	}
>('posts/unlike-post', async ({ postId, post, setPost }, { getState }) => {
	const { user } = getState() as { user: UserStateType };
	const userId = user.data?._id;

	try {
		if (postId && userId) {
			await customeAxios.patch(`/posts/${postId}/unlike`);
		} else if (setPost && post && userId) {
			await customeAxios.patch(`/posts/${post._id}/unlike`);

			setPost({
				...post,
				likesIds: post.likesIds.filter((item) => item !== userId),
				likesCount: post.likesCount - 1,
			});
		}

		return userId;
	} catch (err) {
		console.log(err);
	}
});
