import { combineReducers } from '@reduxjs/toolkit';
import { postsSlice } from '../services/posts/posts.slice';

export const rootReducer = combineReducers({
  posts: postsSlice.reducer
});
