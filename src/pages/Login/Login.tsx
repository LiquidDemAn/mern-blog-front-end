import { Navigate } from 'react-router-dom';
import { Loader } from 'components/common/loader';
import { PathsEnum } from 'typedef';
import { useSelf } from 'hooks/useSelf';
import { useLoginForm } from 'pages/Login/useLoginForm';
import { AuthForm } from 'components/user/auth-form';
import TextFieldController from 'components/TextFieldController';
const LoginPage = () => {
  const { isAuth, isSelfLoading } = useSelf();

  const { form, onSubmit } = useLoginForm();

  if (isAuth) {
    return <Navigate to={PathsEnum.Home} />;
  }

  return (
    <>
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

      <Loader open={isSelfLoading} />
    </>
  );
};

export default LoginPage;
