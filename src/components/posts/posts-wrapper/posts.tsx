import { PostType } from 'redux/services/posts/typedef';
import { Post } from '../post';
import { serverErrorText } from '../../../utils/constants';

type Props = {
  isLoading?: boolean;
  posts?: PostType[];
  isError?: boolean;
};

export const Posts = ({ isLoading, posts = [], isError }: Props) => {
  if (isError) {
    return <h2>{serverErrorText}</h2>;
  }

  return (
    <>
      {!isLoading ? (
        posts.length ? (
          posts.map((post) => <Post key={post._id} post={post} />)
        ) : (
          <h3>List of posts is Empty</h3>
        )
      ) : (
        <></>
      )}
    </>
  );
};
