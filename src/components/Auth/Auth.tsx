import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { LoginType, RegisterType } from 'components/Auth/types';
import { useApi } from 'components/Auth/useApi';
import { AuthContext, AuthProvider } from 'contexts/authContext';
import { removeToken } from 'local-storage';
import { UserType } from 'api/models/UserType';

const Auth: FC<PropsWithChildren> = ({ children }) => {
  const [self, setSelf] = useState<UserType | null>(null);
  const { onLogin, onRegister, isLoading } = useApi({
    setSelf
  });

  const isAuth = !!self;

  const register = (params: RegisterType) => {
    onRegister.mutate(params);
  };

  const login = (params: LoginType) => {
    onLogin.mutate(params);
  };

  const logout = async () => {
    await removeToken();
    await window.location.reload();
  };

  const authProviderValue: AuthContext = {
    self,
    isAuth,
    selfId: self?._id || '',
    isLoading,
    register,
    login,
    logout
  };

  return <AuthProvider value={authProviderValue}>{children}</AuthProvider>;
};

export default Auth;
