import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/common/loader';
import { customeAxios } from '../../redux/axios';
import { getUserId } from '../../redux/services/user/selectors';
import {
	getDeletePostLoading,
	getPostsError,
	getPostsLoading,
} from '../../redux/services/posts/selectors';
import { FullPostType } from '../../redux/services/posts/typedef';
import { useAppDispach, useAppSelector } from '../../redux/store/hooks';
import { FullPostView } from './view';
import {
	likeFullPost,
	unlikeFullPost,
	loadPost,
	createComment,
} from '../../redux/services/posts/actions';

export const FullPost = () => {
	const { id } = useParams();
	const dispatch = useAppDispach();

	const userId = useAppSelector(getUserId);
	const postLoading = useAppSelector(getPostsLoading);
	const deleteLoading = useAppSelector(getDeletePostLoading);

	const loading = useAppSelector(getPostsLoading);
	const error = useAppSelector(getPostsError);

	const [postError, setPostError] = useState<AxiosError | null>(null);
	const [post, setPost] = useState<FullPostType | null>(null);

	const [openCommentError, setOpenCommentError] = useState(false);
	const [commentError, setCommentError] = useState<AxiosError | null>(null);
	const [commentLoading, setCommentLoading] = useState(false);

	const onLikePost = () => {
		if (post) {
			dispatch(likeFullPost({ post, setPost }));
		}
	};

	const onUnlikePost = () => {
		if (post) {
			dispatch(unlikeFullPost({ post, setPost }));
		}
	};

	const onCreateComment = async (text: string) => {
		if (post) {
			dispatch(createComment({ text, post, setPost }));
		}
	};

	const onEditComment = async (commentId: string, text: string) => {
		setCommentLoading(true);
		setCommentError(null);

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
				setCommentError(err);
				setCommentLoading(false);
			});
	};

	const onDeleteComment = async (commentId: string) => {
		setCommentLoading(true);
		setCommentError(null);

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
				setCommentError(err);
				setCommentLoading(false);
			});
	};

	const onlikeComment = async (commentId: string) => {
		setCommentError(null);

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
					setCommentError(err);
				});
		}
	};

	const onUnLikeComment = async (commentId: string) => {
		setCommentError(null);

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
					setCommentError(err);
				});
		}
	};

	const handleOpenCommentError = () => {
		setOpenCommentError(true);
	};

	const handleCloseCommentError = () => {
		setOpenCommentError(false);
		setCommentError(null);
	};

	useEffect(() => {
		setPostError(null);
		dispatch(loadPost({ id, setPost, setPostError }));
	}, [dispatch, id]);

	useEffect(() => {
		if (error) {
			handleOpenCommentError();
		}
	}, [error]);

	return (
		<>
			<FullPostView
				post={post}
				postError={postError}
				postLoading={postLoading}
				onLikePost={onLikePost}
				onUnlikePost={onUnlikePost}
				commentError={error}
				openCommentError={openCommentError}
				handleCloseCommentError={handleCloseCommentError}
				onCreateComment={onCreateComment}
				onEditComment={onEditComment}
				onDeleteComment={onDeleteComment}
				onlikeComment={onlikeComment}
				onUnLikeComment={onUnLikeComment}
			/>
			<Loader open={deleteLoading || loading} />
		</>
	);
};
