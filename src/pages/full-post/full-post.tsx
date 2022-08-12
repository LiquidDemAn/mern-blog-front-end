import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { AddComment } from '../../components/add-comment';
import { Comments } from '../../components/comments';
import { Post } from '../../components/post';
import { customeAxios } from '../../redux/axios';
import { getUser } from '../../redux/services/auth/selectors';
import { FullPostType } from '../../redux/services/posts/typedef';
import { useAppSelector } from '../../redux/store/hooks';

export const FullPost = () => {
	const { id } = useParams();
	const user = useAppSelector(getUser);
	const [isLoading, setIsLoading] = useState(false);
	const [post, setPost] = useState<FullPostType | null>(null);

	useEffect(() => {
		setIsLoading(true);
		if (id) {
			const loadPost = async () => {
				const response = await customeAxios.get(`/posts/${id}`);
				setPost(response.data);
				setIsLoading(false);
			};

			loadPost().catch((error) => {
				console.warn(error);
				setIsLoading(false);
			});
		}
	}, [id]);

	return (
		<>
			<Post
				isLoading={isLoading}
				isEditable={user?._id === post?.author._id}
				post={post}
				isFullPost
			>
				{post?.text ? <ReactMarkdown children={post?.text} /> : <></>}
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
