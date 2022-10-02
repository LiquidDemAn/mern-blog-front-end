import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/loader';
import { customeAxios } from '../../redux/axios';
import { getUserId } from '../../redux/services/auth/selectors';
import {
	getDeletePostLoading,
	getPostsLoading,
} from '../../redux/services/posts/selectors';
import { FullPostType } from '../../redux/services/posts/typedef';
import { useAppSelector } from '../../redux/store/hooks';
import { FullPostView } from './view';

export const FullPost = () => {
	const { id } = useParams();
	const userId = useAppSelector(getUserId);
	const postLoading = useAppSelector(getPostsLoading);
	const deleteLoading = useAppSelector(getDeletePostLoading);

	const [error, setError] = useState<AxiosError | null>(null);
	const [post, setPost] = useState<FullPostType | null>(null);
	const [commentLoading, setCommentLoading] = useState(false);

	const onLoadPost = async () => {
		setError(null);

		await customeAxios
			.get(`/posts/${id}`)
			.then(({ data }) => {
				setPost(data);
			})
			.catch((err: AxiosError) => {
				console.log(err);
				setError(err);
			});
	};

	const onLikePost = async () => {
		setError(null);

		if (post && userId) {
			await customeAxios
				.patch(`/posts/${id}/like`)
				.then(() => {
					setPost({
						...post,
						likesIds: [...post.likesIds, userId],
						likesCount: post.likesCount + 1,
					});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const onUnlikePost = async () => {
		setError(null);

		if (post && userId) {
			await customeAxios
				.patch(`/posts/${id}/unlike`)
				.then(() => {
					setPost({
						...post,
						likesIds: post.likesIds.filter((item) => item !== userId),
						likesCount: post.likesCount - 1,
					});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const onCreateComment = async (text: string) => {
		setCommentLoading(true);

		await customeAxios
			.post(`/posts/${id}/create-comment`, { text })
			.then((response) => {
				if (post) {
					setPost({
						...post,
						comments: [...post?.comments, response.data],
					});
				}

				setCommentLoading(false);
			})
			.catch((err) => {
				console.log(err);

				setCommentLoading(false);
			});
	};

	const onEditComment = async (commentId: string, text: string) => {
		setCommentLoading(true);

		await customeAxios
			.patch(`/posts/${id}/edit-comment/${commentId}`, { text })
			.then(() => {
				if (post) {
					setPost({
						...post,
						comments: post.comments.map((item) => {
							if (item._id === commentId) {
								item.text = text;
							}

							return item;
						}),
					});
				}

				setCommentLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setCommentLoading(false);
			});
	};

	const onDeleteComment = async (commentId: string) => {
		setCommentLoading(true);

		await customeAxios
			.delete(`/posts/${id}/delete-comment/${commentId}`)
			.then(() => {
				if (post) {
					setPost({
						...post,
						comments: post.comments.filter((item) => item._id !== commentId),
					});
				}
				setCommentLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setCommentLoading(false);
			});
	};

	const onlikeComment = async (commentId: string) => {
		// setError(null);

		if (post && userId) {
			await customeAxios
				.patch(`/posts/${id}/like-comment/${commentId}`)
				.then(() => {
					setPost({
						...post,
						comments: post.comments.map((item) => {
							if (item._id === commentId) {
								item.likesCount = item.likesCount + 1;
								item.likesIds.push(userId);
							}

							return item;
						}),
					});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const onUnLikeComment = async (commentId: string) => {
		// setError(null);

		if (post && userId) {
			await customeAxios
				.patch(`/posts/${id}/unlike-comment/${commentId}`)
				.then(() => {
					setPost({
						...post,
						comments: post.comments.map((item) => {
							if (item._id === commentId) {
								item.likesCount = item.likesCount - 1;
								item.likesIds = item.likesIds.filter((id) => id !== userId);
							}

							return item;
						}),
					});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	useEffect(() => {
		onLoadPost();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<FullPostView
				error={error}
				post={post}
				postLoading={postLoading}
				onLikePost={onLikePost}
				onUnlikePost={onUnlikePost}
				onCreateComment={onCreateComment}
				onEditComment={onEditComment}
				onDeleteComment={onDeleteComment}
				onlikeComment={onlikeComment}
				onUnLikeComment={onUnLikeComment}
			/>
			<Loader open={deleteLoading || commentLoading} />
		</>
	);
};
