import * as yup from 'yup';
import {
  emailRegex,
  emailValidationText,
  getLengthErrorText,
  PASSWORDMINLENGTH,
  passwordRegex,
  passwordValidationText,
  requiredFieldText
} from 'utils/constants';

export const loginSchema = {
  email: yup
    .string()
    .email(emailValidationText)
    .required(requiredFieldText)
    .matches(emailRegex, emailValidationText),
  password: yup
    .string()
    .min(PASSWORDMINLENGTH, getLengthErrorText(PASSWORDMINLENGTH))
    .matches(passwordRegex, passwordValidationText)
    .required(requiredFieldText)
};
