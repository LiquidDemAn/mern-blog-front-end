import * as yup from 'yup';
import {
  fullNameRegex,
  fullNameValidationText,
  getLengthErrorText,
  NICKNAMEMINLENGTH,
  nickNameRegex,
  nickNameValidationText,
  requiredFieldText
} from 'utils/constants';
import { loginSchema } from 'utils/yupSchemes';

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
  ...loginSchema
});
