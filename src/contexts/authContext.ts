import { createContext } from 'react';
import { LoginType, RegisterType } from 'components/Auth/types';
import { UserType } from 'api/models/UserType';

export type AuthContext = {
  self: UserType | null;
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
