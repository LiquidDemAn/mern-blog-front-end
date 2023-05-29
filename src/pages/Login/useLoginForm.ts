import { useForm } from 'react-hook-form';
import { useSelf } from 'hooks/useSelf';

const defaultValues = {
  email: '',
  password: ''
};

export const useLoginForm = () => {
  const form = useForm({
    defaultValues
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
