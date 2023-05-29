import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { LoginType, RegisterType } from 'components/Auth/types';
import { useApi } from 'components/Auth/useApi';
import { AuthContext, AuthProvider } from 'contexts/authContext';
import { Loader } from 'components/common/loader';
import { removeToken } from 'local-storage';
import { UserType } from 'api/models/UserType';

const Auth: FC<PropsWithChildren> = ({ children }) => {
  const [self, setSelf] = useState<UserType | null>(null);
  const { getSelfQuery, onLogin, onRegister } = useApi({ setSelf });
  const isAuth = !!self;

  const register = (params: RegisterType) => {
    onRegister.mutate(params);
  };

  const login = (params: LoginType) => {
    onLogin.mutate(params);
  };

  const logout = () => {
    setSelf(null);
    removeToken();
  };

  useEffect(() => {
    if (!getSelfQuery?.data) {
      setSelf(null);
    } else {
      setSelf(getSelfQuery.data);
    }
  }, [getSelfQuery.data]);

  const authProviderValue: AuthContext = {
    self,
    isAuth,
    selfId: self?._id || '',
    isSelfLoading:
      getSelfQuery.isLoading || onLogin.isLoading || onRegister.isLoading,
    register,
    login,
    logout
  };

  return (
    <AuthProvider value={authProviderValue}>
      {children}
      <Loader
        open={
          getSelfQuery.isLoading || onRegister.isLoading || onLogin.isLoading
        }
      />
      ;
    </AuthProvider>
  );
};

export default Auth;
