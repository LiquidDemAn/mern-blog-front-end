import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PathsEnum } from 'typedef';
import { useSelf } from 'hooks/useSelf';
import { AuthForm } from 'components/user/auth-form';
import { AvatarCreator } from 'components/user/avatar-creator';
import TextFieldController from 'components/TextFieldController';
import { useRegistrationForm } from 'pages/Registration/useRegistrationForm';
import { registerFieldItems } from 'pages/Registration/utils';

export const RegistrationPage = () => {
  const { isAuth } = useSelf();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState('');
  const { form, onSubmit } = useRegistrationForm(avatar);

  useEffect(() => {
    if (isAuth) {
      navigate(PathsEnum.Home);
    }
  }, [isAuth]);

  return (
    <AuthForm onSubmit={onSubmit} title="Registration">
      <AvatarCreator setAvatar={setAvatar} />
      {registerFieldItems.map(({ name, label, helperText, type }) => (
        <TextFieldController
          form={form}
          name={name}
          label={label}
          helperText={helperText}
          type={type}
        />
      ))}
    </AuthForm>
  );
};

export default RegistrationPage;
