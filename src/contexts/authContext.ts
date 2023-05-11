import { createContext } from 'react';
import { LoginType, RegisterType, UserDataType } from 'components/Auth/types';

export type AuthContext = {
  self: UserDataType | null;
  isAuth: boolean;
  selfId: string;
  isSelfLoading: boolean;
  register: (params: RegisterType) => void;
  login: (params: LoginType) => void;
  logout: () => void;
};

export const authContext = createContext<AuthContext>({
  self: null,
  isAuth: false,
  selfId: '',
  isSelfLoading: false,
  register: () => null,
  login: () => null,
  logout: () => null
});

export const AuthProvider = authContext.Provider;
