import { useNavigate } from 'react-router-dom';
import { PathsEnum } from 'typedef';
import { useSelf } from 'hooks/useSelf';
import { useLoginForm } from 'pages/Login/useLoginForm';
import { AuthForm } from 'components/user/auth-form';
import TextFieldController from 'components/TextFieldController';
import { useEffect } from 'react';
const LoginPage = () => {
  const { isAuth } = useSelf();
  const navigate = useNavigate();
  const { form, onSubmit } = useLoginForm();

  useEffect(() => {
    if (isAuth) {
      navigate(PathsEnum.Home);
    }
  }, [isAuth]);

  return (
    <AuthForm onSubmit={onSubmit} title="Login">
      <TextFieldController
        form={form}
        label="Email"
        name="email"
        type="email"
      />

      <TextFieldController
        form={form}
        label="Password"
        name="password"
        type="password"
      />
    </AuthForm>
  );
};

export default LoginPage;
