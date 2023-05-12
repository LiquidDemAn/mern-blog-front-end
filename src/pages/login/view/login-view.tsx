import { TextField } from '@mui/material';
import { AuthForm } from 'components/user/auth-form';
import {
  DeepRequired,
  FieldErrorsImpl,
  UseFormHandleSubmit,
  UseFormRegister
} from 'react-hook-form';
import { LoginType } from 'components/Auth/types';

type Props = {
  isValid: boolean;
  errors: FieldErrorsImpl<DeepRequired<LoginType>>;
  handleSubmit: UseFormHandleSubmit<LoginType>;
  register: UseFormRegister<LoginType>;
  onSubmit: (values: LoginType) => void;
};

export const LoginView = ({
  isValid,
  errors,
  handleSubmit,
  register,
  onSubmit
}: Props) => {
  return (
    <AuthForm
      isValid={isValid}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      title="Login"
    >
      <TextField
        fullWidth
        label="Email"
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        type="email"
        id="email"
        {...register('email', { required: 'Enter email' })}
      />

      <TextField
        fullWidth
        label="Password"
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        type="password"
        id="password"
        {...register('password', { required: 'Enter password' })}
      />
    </AuthForm>
  );
};
