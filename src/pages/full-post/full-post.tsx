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

	const likeHandle = async () => {
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

	const unlikeHandle = async () => {
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

	const createComment = async (text: string) => {
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

	const deleteComment = async (postId: string, commentId: string) => {
		setCommentLoading(true);

		await customeAxios
			.delete(`/posts/${postId}/delete-comment/${commentId}`)
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

	const editComment = async (
		postId: string,
		commentId: string,
		text: string
	) => {
		setCommentLoading(true);

		await customeAxios
			.patch(`/posts/${postId}/edit-comment/${commentId}`, { text })
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

	useEffect(() => {
		const loadPost = async () => {
			setError(null);

			const response = await customeAxios.get(`/posts/${id}`);
			setPost(response.data);
		};

		loadPost().catch((error: AxiosError) => {
			console.warn(error);
			setError(error);
		});
	}, [id]);

	return (
		<>
			<FullPostView
				error={error}
				post={post}
				postLoading={postLoading}
				likeHandle={likeHandle}
				unlikeHandle={unlikeHandle}
				createComment={createComment}
				editComment={editComment}
				deleteComment={deleteComment}
			/>
			<Loader open={deleteLoading || commentLoading} />
		</>
	);
};
