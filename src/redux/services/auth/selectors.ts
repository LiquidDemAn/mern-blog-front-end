import { AppState } from './../../store/typedef';

export const getIsAuth = (state: AppState) => Boolean(state.auth.userData);
export const getUser = (state: AppState) => state.auth.userData;
