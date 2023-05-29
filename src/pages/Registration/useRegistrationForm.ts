import { useForm } from 'react-hook-form';
import { useSelf } from 'hooks/useSelf';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationSchema } from 'pages/Registration/registrationSchema';

const defaultValues = {
  email: '',
  password: '',
  fullName: '',
  nickName: '',
  avatarUrl: ''
};

export const useRegistrationForm = (avatar?: string) => {
  const { register } = useSelf();

  const form = useForm({
    defaultValues,
    resolver: yupResolver(registrationSchema)
  });

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
