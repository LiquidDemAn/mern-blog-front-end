import ReactMarkdown from 'react-markdown';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import { Post } from '../../../components/post';
import { FullPostType } from '../../../redux/services/posts/typedef';
// import { Comments } from '../../../components/comments';
// import { AddComment } from '../../../components/add-comment';

type Props = {
	error: AxiosError | null;
	post: FullPostType | null;
	userId?: string;
	likeHandle: () => Promise<void>;
	unlikeHandle: () => Promise<void>;
	isLiked: boolean;
};

export const FullPostView = ({
	error,
	post,
	userId,
	likeHandle,
	unlikeHandle,
	isLiked,
}: Props) => {
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
			<Post
				fullPostLikeHandle={likeHandle}
				fullPostUnlikeHandle={unlikeHandle}
				isLiked={isLiked}
				isEditable={userId === post?.author._id}
				post={post}
				isFullPost
			>
				{post?.text ? <ReactMarkdown children={post?.text} /> : <></>}
			</Post>

			{/* <Comments
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
			</Comments> */}
		</>
	);
};
