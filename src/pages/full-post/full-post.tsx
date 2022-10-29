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
	deleteComment,
	likeComment,
	unlikeCommnet,
} from '../../redux/services/posts/actions';
import { removeCommentError } from '../../redux/services/posts/posts.slice';

export const FullPost = () => {
	const { id } = useParams();
	const dispatch = useAppDispach();

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
		if (post) {
			dispatch(deleteComment({ commentId, post, setPost }));
		}
	};

	const onlikeComment = async (commentId: string) => {
		if (post) {
			dispatch(likeComment({ commentId, post, setPost }));
		}
	};

	const onUnLikeComment = async (commentId: string) => {
		if (post) {
			dispatch(unlikeCommnet({ commentId, post, setPost }));
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
