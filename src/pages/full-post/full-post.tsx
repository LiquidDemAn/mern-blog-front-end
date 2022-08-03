import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AddComment } from '../../components/add-comment';
import { Comments } from '../../components/comments';
import { Post } from '../../components/post';
import { loadPost } from '../../redux/services/posts/actions';
import { getPost, getPostsLoading } from '../../redux/services/posts/selectors';
import { useAppDispach, useAppSelector } from '../../redux/store/hooks';

export const FullPost = () => {
	const { id } = useParams();
	const dispatch = useAppDispach();
	const post = useAppSelector(getPost);
	const postLoading = useAppSelector(getPostsLoading);

	useEffect(() => {
		if (id) {
			dispatch(loadPost(id));
		}
	}, [dispatch, id]);

	return (
		<>
			<Post isLoading={postLoading} post={post} isFullPost>
				<p>{post?.text}</p>
			</Post>
			<Comments
				items={[
					{
						user: {
							fullName: 'Вася Пупкин',
							avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
						},
						text: 'Это тестовый комментарий',
					},
					{
						user: {
							fullName: 'Иван Иванов',
							avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
						},
						text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
					},
				]}
				isLoading={false}
			>
				<AddComment />
			</Comments>
		</>
	);
};
