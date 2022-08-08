import { AppState } from './../../store/typedef';

export const getIsAuth = (state: AppState) => Boolean(state.auth.userData);
