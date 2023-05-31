import * as yup from 'yup';
import {
  emailRegex,
  emailValidationText,
  fullNameRegex,
  fullNameValidationText,
  getLengthErrorText,
  NICKNAMEMINLENGTH,
  nickNameRegex,
  nickNameValidationText,
  PASSWORDMINLENGTH,
  passwordRegex,
  passwordValidationText,
  requiredFieldText
} from 'utils/constants';

export const registrationSchema = yup.object({
  fullName: yup
    .string()
    .matches(fullNameRegex, fullNameValidationText)
    .required(requiredFieldText),
  nickName: yup
    .string()
    .min(NICKNAMEMINLENGTH, getLengthErrorText(NICKNAMEMINLENGTH))
    .matches(nickNameRegex, nickNameValidationText)
    .required(requiredFieldText),
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
});
