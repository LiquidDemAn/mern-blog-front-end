import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { customeAxios } from '../../axios';
import { FullPostType, PostType } from './typedef';
import { useSelf } from 'hooks/useSelf';
import { UserType } from 'api/models/UserType';

export type UserStateType = {
  data: null | UserType;
  loading: boolean;
  error: null | unknown;
  validationError: null | unknown;
};

export const loadPosts = createAsyncThunk<PostType[], string>(
  'Posts/load-Posts',
  async (url, { rejectWithValue }) => {
    try {
      const response = await customeAxios.get(url);
      return await response.data;
    } catch (err) {
      const error = err as AxiosError;

      return rejectWithValue({
        status: error.response?.status,
        message: error.message
      });
    }
  }
);

export const loadPost = createAsyncThunk<
  void,
  {
    id?: string;
    setPost: (value: FullPostType) => void;
  }
>('Posts/load-post', async ({ id, setPost }, { rejectWithValue }) => {
  try {
    if (id) {
      const { data } = await customeAxios.get(`/posts/${id}`);
      setPost(data);
    }
  } catch (err) {
    rejectWithValue(err);
  }
});

export const deletePost = createAsyncThunk(
  'Posts/delete-post',
  async (id: string, { rejectWithValue }) => {
    try {
      await customeAxios.delete(`/posts/${id}`);
    } catch (err) {
      const error = err as AxiosError;
      console.log(err);

      return rejectWithValue({
        status: error.response?.status,
        message: error.message
      });
    }
  }
);

export const likePost = createAsyncThunk<string | undefined, string>(
  'Posts/like-post',
  async (id) => {
    const { self } = useSelf();

    try {
      await customeAxios.patch(`/posts/${id}/like`);
      return self?._id;
    } catch (err) {
      console.log(err);
    }
  }
);

export const unlikePost = createAsyncThunk<string | undefined, string>(
  'Posts/unlike-post',
  async (id, { getState }) => {
    const { user } = getState() as { user: UserStateType };
    const userId = user.data?._id;

    try {
      await customeAxios.patch(`/posts/${id}/unlike`);

      return userId;
    } catch (err) {
      console.log(err);
    }
  }
);

export const likeFullPost = createAsyncThunk<
  void,
  {
    post: FullPostType;
    setPost: (value: FullPostType) => void;
  }
>('Posts/like-full-post', async ({ post, setPost }, { getState }) => {
  const { user } = getState() as { user: UserStateType };
  const userId = user.data?._id;

  try {
    if (userId) {
      await customeAxios.patch(`/posts/${post._id}/like`);

      setPost({
        ...post,
        likesIds: [...post.likesIds, userId],
        likesCount: post.likesCount + 1
      });
    }
  } catch (err) {
    console.log(err);
  }
});

export const unlikeFullPost = createAsyncThunk<
  void,
  {
    post: FullPostType;
    setPost: (value: FullPostType) => void;
  }
>('Posts/unlike-full-post', async ({ post, setPost }, { getState }) => {
  const { user } = getState() as { user: UserStateType };
  const userId = user.data?._id;

  try {
    if (userId) {
      await customeAxios.patch(`/posts/${post._id}/unlike`);

      setPost({
        ...post,
        likesIds: post.likesIds.filter((item) => item !== userId),
        likesCount: post.likesCount - 1
      });
    }
  } catch (err) {
    console.log(err);
  }
});

export const createComment = createAsyncThunk<
  void,
  {
    text: string;
    post: FullPostType;
    setPost: (value: FullPostType) => void;
  }
>(
  'Posts/create-comment',
  async ({ text, post, setPost }, { rejectWithValue }) => {
    try {
      const { data } = await customeAxios.post(
        `/posts/${post._id}/create-comment`,
        { text }
      );

      setPost({
        ...post,
        comments: [...post?.comments, data]
      });
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const editComment = createAsyncThunk<
  void,
  {
    commentId: string;
    text: string;
    post: FullPostType;
    setPost: (value: FullPostType) => void;
  }
>(
  'Posts/edit-comment',
  async ({ commentId, text, post, setPost }, { rejectWithValue }) => {
    try {
      await customeAxios
        .patch(`/posts/${post._id}/edit-comment/${commentId}`, {
          text
        })
        .then(() => {
          setPost({
            ...post,
            comments: post.comments.map((item) => {
              if (item._id === commentId) {
                item.text = text;
              }

              return item;
            })
          });
        });
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteComment = createAsyncThunk<
  void,
  {
    commentId: string;
    post: FullPostType;
    setPost: (value: FullPostType) => void;
  }
>(
  'Posts/delete-comment',
  async ({ commentId, post, setPost }, { rejectWithValue }) => {
    try {
      await customeAxios
        .delete(`/posts/${post._id}/delete-comment/${commentId}`)
        .then(() => {
          setPost({
            ...post,
            comments: post.comments.filter((item) => item._id !== commentId)
          });
        });
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const likeComment = createAsyncThunk<
  void,
  {
    commentId: string;
    post: FullPostType;
    setPost: (value: FullPostType) => void;
  }
>(
  'Posts/like-comment',
  async ({ commentId, post, setPost }, { getState, rejectWithValue }) => {
    try {
      const { user } = getState() as { user: UserStateType };
      const userId = user.data?._id;

      if (userId) {
        await customeAxios
          .patch(`/posts/${post._id}/like-comment/${commentId}`)
          .then(() => {
            setPost({
              ...post,
              comments: post.comments.map((item) => {
                if (item._id === commentId) {
                  item.likesCount = item.likesCount + 1;
                  item.likesIds.push(userId);
                }

                return item;
              })
            });
          });
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const unlikeCommnet = createAsyncThunk<
  void,
  {
    commentId: string;
    post: FullPostType;
    setPost: (value: FullPostType) => void;
  }
>(
  'Posts/unlike-comment',
  async ({ commentId, post, setPost }, { getState, rejectWithValue }) => {
    try {
      const { user } = getState() as { user: UserStateType };
      const userId = user.data?._id;

      if (userId) {
        await customeAxios
          .patch(`/posts/${post._id}/unlike-comment/${commentId}`)
          .then(() => {
            setPost({
              ...post,
              comments: post.comments.map((item) => {
                if (item._id === commentId) {
                  item.likesCount = item.likesCount - 1;
                  item.likesIds = item.likesIds.filter((id) => id !== userId);
                }

                return item;
              })
            });
          });
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
