import { createContext } from 'react';
import { UserDataType } from './types';

export type AuthContext = {
  self: UserDataType | null;
};

export const authContext = createContext<AuthContext>({
  self: null
});

export const AuthProvider = authContext.Provider;
