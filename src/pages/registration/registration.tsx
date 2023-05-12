import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { RegistrationView } from './view';
import { PathsEnum } from 'typedef';
import { useSelf } from 'hooks/useSelf';
import { RegisterType } from 'components/Auth/types';

export const Registration = () => {
  const [avatar, setAvatar] = useState('');

  const {
    register,
    handleSubmit,
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
      handleSubmit={handleSubmit}
      register={register}
      onSubmit={onSubmit}
      setAvatar={setAvatar}
    />
  );
};
