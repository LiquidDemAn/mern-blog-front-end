import ReactMarkdown from 'react-markdown';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import { Post } from '../../../components/post';
import { FullPostType } from '../../../redux/services/posts/typedef';
import { Comments } from '../components/comments';
import { AddComment } from '../components/add-comment';

type Props = {
  post: FullPostType | null;
  postError: AxiosError | null;
  loading?: boolean;
  onLikePost: () => void;
  onUnlikePost: () => void;

  onCreateComment: (text: string) => void;
  onEditComment: (commentId: string, text: string) => void;
  onDeleteComment: (commentId: string) => Promise<void>;
  onlikeComment: (commentId: string) => Promise<void>;
  onUnLikeComment: (commentId: string) => Promise<void>;
};

export const FullPostView = ({
  post,
  postError,
  onLikePost,
  loading,
  onUnlikePost,

  onCreateComment,
  onEditComment,
  onDeleteComment,
  onlikeComment,
  onUnLikeComment
}: Props) => {
  if (postError?.response?.status === 404) {
    return (
      <h2>
        Post Not Found! Go to <Link to="/">Home page</Link>
      </h2>
    );
  }

  if (postError?.response?.status === 500) {
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
        onLikeFullPost={onLikePost}
        onUnlikeFullPost={onUnlikePost}
        post={post}
        isFullPost
      >
        {post?.text ? <ReactMarkdown children={post?.text} /> : <></>}
      </Post>

      <Comments
        comments={post?.comments}
        isLoading={loading}
        onEditComment={onEditComment}
        onDeleteComment={onDeleteComment}
        onlikeComment={onlikeComment}
        onUnLikeComment={onUnLikeComment}
      >
        <AddComment createComment={onCreateComment} />
      </Comments>
    </>
  );
};
