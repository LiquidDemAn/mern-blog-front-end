import { useForm } from 'react-hook-form';
import { useSelf } from 'hooks/useSelf';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from 'pages/Login/loginSchema';

const defaultValues = {
  email: '',
  password: ''
};

export const useLoginForm = () => {
  const form = useForm({
    defaultValues,
    resolver: yupResolver(loginSchema)
  });

  const { login } = useSelf();

  const onSubmit = () => {
    login(form.getValues());
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit)
  };
};
