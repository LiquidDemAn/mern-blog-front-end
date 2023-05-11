import { createContext } from 'react';
import { LoginType, UserDataType } from './types';

export type AuthContext = {
  self: UserDataType | null;
  isAuth: boolean;
  selfId: string;
  isSelfLoading: boolean;
  login: (params: LoginType) => void;
};

export const authContext = createContext<AuthContext>({
  self: null,
  isAuth: false,
  selfId: '',
  isSelfLoading: false,
  login: () => null
});

export const AuthProvider = authContext.Provider;
