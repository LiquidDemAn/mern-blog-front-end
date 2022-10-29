import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/common/loader';
import { customeAxios } from '../../redux/axios';
import { getUserId } from '../../redux/services/user/selectors';
import {
	getCommentError,
	getPostError,
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
	editComment,
} from '../../redux/services/posts/actions';
import { removeCommentError } from '../../redux/services/posts/posts.slice';

export const FullPost = () => {
	const { id } = useParams();
	const dispatch = useAppDispach();

	const userId = useAppSelector(getUserId);

	const loading = useAppSelector(getPostsLoading);

	const postError = useAppSelector(getPostError);
	const commentError = useAppSelector(getCommentError);

	const [post, setPost] = useState<FullPostType | null>(null);

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
		if (post) {
			dispatch(editComment({ commentId, text, post, setPost }));
		}
	};

	const onDeleteComment = async (commentId: string) => {
		await customeAxios
			.delete(`/posts/${id}/delete-comment/${commentId}`)
			.then(() => {
				if (post) {
					setPost({
						...post,
						comments: post.comments.filter((item) => item._id !== commentId),
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const onlikeComment = async (commentId: string) => {
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

	const handleCloseCommentError = () => {
		dispatch(removeCommentError());
	};

	useEffect(() => {
		dispatch(loadPost({ id, setPost }));
	}, [dispatch, id]);

	return (
		<>
			<FullPostView
				post={post}
				postError={postError}
				postLoading={loading}
				onLikePost={onLikePost}
				onUnlikePost={onUnlikePost}
				commentError={Boolean(commentError)}
				handleCloseCommentError={handleCloseCommentError}
				onCreateComment={onCreateComment}
				onEditComment={onEditComment}
				onDeleteComment={onDeleteComment}
				onlikeComment={onlikeComment}
				onUnLikeComment={onUnLikeComment}
			/>
			<Loader open={loading} />
		</>
	);
};
