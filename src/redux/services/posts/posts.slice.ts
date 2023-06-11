import { createSlice } from '@reduxjs/toolkit';
import {
  loadPosts,
  deletePost,
  likePost,
  unlikePost,
  createComment,
  editComment,
  loadPost,
  deleteComment
} from './actions';
import { PostsStateType } from './typedef';

const initialState: PostsStateType = {
  posts: [],
  loading: false,
  postsError: null,
  postError: null,
  commentError: null
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    removePostError(state) {
      state.postError = null;
    },
    removeCommentError(state) {
      state.commentError = null;
    }
  },
  extraReducers: (bulider) =>
    bulider
      // Load all Posts
      .addCase(loadPosts.pending, (state) => {
        state.posts = [];
        state.loading = true;
        state.postsError = null;
      })
      .addCase(loadPosts.fulfilled, (state, { payload }) => {
        state.posts = payload;
        state.loading = false;
        state.postsError = null;
      })
      .addCase(loadPosts.rejected, (state, { payload }) => {
        state.loading = false;
        state.postsError = payload;
      })

      // Load post
      .addCase(loadPost.pending, (state) => {
        state.loading = true;
        state.postError = null;
      })

      .addCase(loadPost.fulfilled, (state) => {
        state.loading = false;
        state.postError = null;
      })

      .addCase(loadPost.rejected, (state, { payload }) => {
        state.loading = false;
        state.postError = payload;
      })

      // Delete post
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.postError = null;
      })
      .addCase(deletePost.fulfilled, (state, { meta }) => {
        state.posts = state.posts.filter((item) => item._id !== meta.arg);
        state.loading = false;
        state.postError = null;
      })
      .addCase(deletePost.rejected, (state, { payload }) => {
        state.loading = false;
        state.postError = payload;
      })

      // Like post
      .addCase(likePost.fulfilled, (state, { meta, payload }) => {
        if (payload) {
          const postId = meta.arg;
          const post = state.posts.find((item) => item._id === postId);

          if (post) {
            post.likesCount = post.likesCount + 1;
            post.likesIds.push(payload);
          }
        }
      })

      // Unlike post
      .addCase(unlikePost.fulfilled, (state, { meta, payload }) => {
        if (payload) {
          const postId = meta.arg;
          const post = state.posts.find((item) => item._id === postId);

          if (post) {
            post.likesCount = post.likesCount - 1;
            post.likesIds = post.likesIds.filter((item) => item !== payload);
          }
        }
      })

      // Create comment
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.commentError = null;
      })

      .addCase(createComment.fulfilled, (state) => {
        state.loading = false;
        state.commentError = null;
      })

      .addCase(createComment.rejected, (state, { payload }) => {
        state.loading = false;
        state.commentError = payload;
      })

      // Edit comment
      .addCase(editComment.pending, (state) => {
        state.loading = true;
        state.commentError = null;
      })

      .addCase(editComment.fulfilled, (state) => {
        state.loading = false;
        state.commentError = null;
      })

      .addCase(editComment.rejected, (state, { payload }) => {
        state.loading = false;
        state.commentError = payload;
      })

      // Delete comment
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.commentError = null;
      })

      .addCase(deleteComment.fulfilled, (state) => {
        state.loading = false;
        state.commentError = null;
      })

      .addCase(deleteComment.rejected, (state, { payload }) => {
        state.loading = false;
        state.commentError = payload;
      })
});

export const { removeCommentError, removePostError } = postsSlice.actions;
