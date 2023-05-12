import { combineReducers } from '@reduxjs/toolkit';
import { postsSlice } from '../services/posts/posts.slice';
import { tagsSlice } from '../services/tags/tags.slice';

export const rootReducer = combineReducers({
  posts: postsSlice.reducer,
  tags: tagsSlice.reducer
});
