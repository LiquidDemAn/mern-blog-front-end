import { createSlice } from '@reduxjs/toolkit';
import { UserStateType } from './typedef';
import { follow, unFollow } from './actions';

const initialState: UserStateType = {
  data: null,
  loading: false,
  error: null,
  validationError: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetErrors(state) {
      state.error = null;
      state.validationError = null;
    }
  },
  extraReducers: (bulider) =>
    bulider
      // follow
      .addCase(follow.pending, (state) => {
        state.error = null;
      })
      .addCase(follow.fulfilled, (state, { payload }) => {
        state.error = null;

        if (payload) {
          state.data?.following.push(payload);
        }
      })
      .addCase(follow.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // unFollow
      .addCase(unFollow.pending, (state) => {
        state.error = null;
      })
      .addCase(unFollow.fulfilled, (state, { payload }) => {
        state.error = null;

        if (payload && state.data?.following) {
          state.data.following = state.data?.following.filter(
            (item) => item._id !== payload
          );
        }
      })
      .addCase(unFollow.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
});

export const { resetErrors } = userSlice.actions;
