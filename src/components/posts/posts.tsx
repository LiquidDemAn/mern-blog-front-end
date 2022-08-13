import { PostType } from '../../redux/services/posts/typedef';
import { Post } from '../post/post';

type Props = {
	isLoading: boolean;
	posts: PostType[];
	userId?: string;
	error?: null | string | number;
};

export const Posts = ({ isLoading, posts, userId, error }: Props) => {
	if (error) {
		return <h2>Something went wrong....</h2>;
	}

	return (
		<>
			{isLoading
				? [...Array(5)].map((_, index) => <Post key={index} />)
				: posts.map((post) => (
						<Post
							key={post._id}
							post={post}
							isEditable={userId === post.author._id}
						/>
				  ))}
		</>
	);
};
