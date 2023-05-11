import { createSlice } from '@reduxjs/toolkit';
import { UserStateType } from './typedef';

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
  }
});

export const { resetErrors } = userSlice.actions;
