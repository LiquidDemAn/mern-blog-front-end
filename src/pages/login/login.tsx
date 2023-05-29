import { Controller } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { Loader } from 'components/common/loader';
import { PathsEnum } from 'typedef';
import { useSelf } from 'hooks/useSelf';
import { useLoginForm } from 'pages/login/useLoginForm';
import { AuthForm } from 'components/user/auth-form';
import { TextField } from '@mui/material';

export const Login = () => {
  const { isAuth, isSelfLoading } = useSelf();

  const { form, onSubmit } = useLoginForm();

  if (isAuth) {
    return <Navigate to={PathsEnum.Home} />;
  }

  return (
    <>
      <AuthForm onSubmit={onSubmit} title="Login">
        <Controller
          control={form.control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Email"
              type="email"
              onChange={field.onChange}
            />
          )}
          name="email"
        />

        <Controller
          control={form.control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Password"
              type="password"
              onChange={field.onChange}
            />
          )}
          name="password"
        />
      </AuthForm>

      <Loader open={isSelfLoading} />
    </>
  );
};
