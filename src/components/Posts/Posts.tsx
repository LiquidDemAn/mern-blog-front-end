import { PostType } from 'redux/services/posts/typedef';
import Post from '../Post';
import { Typography } from '@mui/material';
import ContentLoader from '../ContentLoader';

type Props = {
  isLoading?: boolean;
  posts?: PostType[];
  isError?: boolean;
};

const Posts = ({ isLoading, posts = [], isError }: Props) => {
  if (isLoading) {
    return <ContentLoader wrapperClasses="mt-48" />;
  }

  return (
    <>
      {!isError || !posts.length ? (
        posts.map((post) => <Post key={post._id} post={post} />)
      ) : (
        <Typography variant="subtitle1">List of posts is Empty</Typography>
      )}
    </>
  );
};

export default Posts;
