import ReactMarkdown from 'react-markdown';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import { Post } from '../../../components/post';
import { FullPostType } from '../../../redux/services/posts/typedef';
import { Comments } from '../../../components/comments';
import { AddComment } from '../../../components/add-comment';

type Props = {
	error: AxiosError | null;
	post: FullPostType | null;
	likeHandle: () => Promise<void>;
	unlikeHandle: () => Promise<void>;
	createComment: (text: string) => Promise<void>;
};

export const FullPostView = ({
	error,
	post,
	likeHandle,
	unlikeHandle,
	createComment,
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
				post={post}
				isFullPost
			>
				{post?.text ? <ReactMarkdown children={post?.text} /> : <></>}
			</Post>

			<Comments items={post?.comments} isLoading={false}>
				<AddComment createComment={createComment} />
			</Comments>
		</>
	);
};
