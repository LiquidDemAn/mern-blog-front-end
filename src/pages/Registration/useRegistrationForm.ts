import { useForm } from 'react-hook-form';
import { useSelf } from 'hooks/useSelf';

const defaultValues = {
  email: '',
  password: '',
  fullName: '',
  nickName: '',
  avatarUrl: ''
};

export const useRegistrationForm = (avatar?: string) => {
  const { register } = useSelf();
  const form = useForm({ defaultValues });

  const onSubmit = () => {
    if (avatar) {
      register({ ...form.getValues(), avatarUrl: avatar });
    } else {
      register(form.getValues());
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit)
  };
};
