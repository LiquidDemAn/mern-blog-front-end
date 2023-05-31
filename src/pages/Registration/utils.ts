import {
  emailValidationText,
  fullNameValidationText,
  nickNameValidationText,
  passwordValidationText
} from 'utils/constants';

export type registerFieldItem = {
  name: string;
  label?: string;
  type?: string;
  helperText?: string;
};

export const registerFieldItems: registerFieldItem[] = [
  {
    label: 'Full Name',
    name: 'fullName',
    helperText: fullNameValidationText
  },
  {
    label: 'Nick Name',
    name: 'nickName',
    helperText: nickNameValidationText
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    helperText: emailValidationText
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    helperText: passwordValidationText
  }
];
