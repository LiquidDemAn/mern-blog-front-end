import { useAppDispach, useAppSelector } from 'redux/store/hooks';
import { useForm } from 'react-hook-form';
import { ParamsEnum } from 'redux/services/user/typedef';
import { Navigate } from 'react-router-dom';
import {
  getUserError,
  getUserValidationParams
} from "redux/services/user/selectors";
import { useState, useEffect } from 'react';
import { resetErrors } from "redux/services/user/user.slice";
import { RegistrationView } from './view';
import { PathsEnum } from 'typedef';
import { useSelf } from 'hooks/useSelf';
import { RegisterType } from 'components/Auth/types';

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
  const { isAuth, register: onRegister } = useSelf();

  const dispatch = useAppDispach();
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
      onRegister({ ...values, avatarUrl: avatar });
    } else {
      onRegister(values);
    }
  };

  if (isAuth) {
    return <Navigate to={PathsEnum.Home} />;
  }

  return (
    <RegistrationView
      isValid={isValid}
      errors={errors}
      error={error}
      handleSubmit={handleSubmit}
      register={register}
      onSubmit={onSubmit}
      setAvatar={setAvatar}
    />
  );
};
