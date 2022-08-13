import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
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
	const [error, setError] = useState<AxiosError | null>(null);
	const [post, setPost] = useState<FullPostType | null>(null);

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

	console.log(error?.response?.status);

	if (error?.response?.status === 404) {
		return (
			<h2>
				Post Not Found! Go to <Link to='/'>Home page</Link>
			</h2>
		);
	}

	if (error?.response?.status === 500) {
		return (
			<>
				<h2>Something went wrong! Possible problems:</h2>
				<ul>
					<li>Wrong URL. Check URL and try again;</li>
					<li>Server Error. Try again later;</li>
				</ul>
			</>
		);
	}

	return (
		<>
			<Post isEditable={user?._id === post?.author._id} post={post} isFullPost>
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
