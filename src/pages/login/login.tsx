import { useAppSelector } from 'redux/store/hooks';
import { useForm } from 'react-hook-form';
import { getUserError } from 'redux/services/user/selectors';
import { Navigate } from 'react-router-dom';
import { Loader } from 'components/common/loader';
import { LoginView } from './view';
import { PathsEnum } from 'typedef';
import { useSelf } from 'hooks/useSelf';
import { LoginType } from 'components/Auth/types';

export const Login = () => {
  const { isAuth, isSelfLoading } = useSelf();
  const error = useAppSelector(getUserError);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  const { login } = useSelf();

  const onSubmit = (values: LoginType) => {
    login(values);
  };

  if (isAuth) {
    return <Navigate to={PathsEnum.Home} />;
  }

  return (
    <>
      <LoginView
        isValid={isValid}
        errors={errors}
        error={error}
        handleSubmit={handleSubmit}
        register={register}
        onSubmit={onSubmit}
      />

      <Loader open={isSelfLoading} />
    </>
  );
};
