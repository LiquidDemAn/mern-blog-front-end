import { PostType } from '../../../redux/services/posts/typedef';
import { ErrorType } from '../../../typedef';
import { Post } from '../post/post';

type Props = {
	isLoading?: boolean;
	posts: PostType[];
	error?: ErrorType | null;
};

export const Posts = ({ isLoading, posts, error }: Props) => {
	if (error) {
		return <h2>Something went wrong....</h2>;
	}

	return (
		<>
			{isLoading ? (
				[...Array(5)].map((_, index) => <Post key={index} />)
			) : posts.length ? (
				posts.map((post) => <Post key={post._id} post={post} />)
			) : (
				<h3>List of posts is Empty</h3>
			)}
		</>
	);
};
