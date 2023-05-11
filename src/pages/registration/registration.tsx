import { useAppDispach, useAppSelector } from "redux/store/hooks";
import { useForm } from 'react-hook-form';
import { ParamsEnum, RegisterType } from "redux/services/user/typedef";
import { Navigate } from 'react-router-dom';
import {
  getUserError,
  getUserLoading,
  getUserValidationParams
} from '../../redux/services/user/selectors';
import { registerUser } from '../../redux/services/user/actions';
import { useState, useEffect } from 'react';
import { resetErrors } from '../../redux/services/user/user.slice';
import { Loader } from '../../components/common/loader';
import { RegistrationView } from './view';
import { PathsEnum } from '../../typedef';
import { useSelf } from 'hooks/useSelf';

export const Registration = () => {
  const [avatar, setAvatar] = useState('');

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
      nickName: '',
      avatarUrl: avatar
    },
    mode: 'onChange'
  });
  const { isAuth } = useSelf();

  const dispatch = useAppDispach();
  const loading = useAppSelector(getUserLoading);
  const error = useAppSelector(getUserError);
  const params = useAppSelector(getUserValidationParams);

  const fullNameError = params?.includes(ParamsEnum.FullName);
  const nickNameError = params?.includes(ParamsEnum.NickName);
  const emailError = params?.includes(ParamsEnum.Email);
  const passwordError = params?.includes(ParamsEnum.Password);

  useEffect(() => {
    if (fullNameError) {
      setError('fullName', {
        type: 'fullName',
        message: 'Full name is not correct!'
      });
    }
  }, [setError, fullNameError]);

  useEffect(() => {
    if (nickNameError) {
      setError('nickName', {
        type: 'nickName',
        message: 'Nick name is not correct!'
      });
    }
  }, [setError, nickNameError]);

  useEffect(() => {
    if (passwordError) {
      setError('password', {
        type: 'password',
        message: 'Password is not correct!'
      });
    }
  }, [setError, passwordError]);

  useEffect(() => {
    if (emailError) {
      setError('email', {
        type: 'email',
        message: 'Email is not correct!'
      });
    }
  }, [setError, emailError]);

  useEffect(() => {
    return () => {
      dispatch(resetErrors());
    };
  }, [dispatch]);

  const onSubmit = (values: RegisterType) => {
    if (avatar) {
      dispatch(
        registerUser({
          ...values,
          avatarUrl: avatar
        })
      );
    } else {
      dispatch(registerUser(values));
    }
  };

  if (isAuth) {
    return <Navigate to={PathsEnum.Home} />;
  }

  return (
    <>
      <RegistrationView
        isValid={isValid}
        errors={errors}
        error={error}
        handleSubmit={handleSubmit}
        register={register}
        onSubmit={onSubmit}
        setAvatar={setAvatar}
      />

      <Loader open={loading} />
    </>
  );
};
