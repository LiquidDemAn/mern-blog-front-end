import * as yup from 'yup';
import {
  getLengthErrorText,
  requiredFieldText,
  validateEmailText
} from 'utils/constants';

export const registrationSchema = yup.object({
  email: yup.string().email(validateEmailText).required(requiredFieldText),
  fullName: yup
    .string()
    .min(3, getLengthErrorText(3))
    .required(requiredFieldText),
  nickName: yup
    .string()
    .min(3, getLengthErrorText(3))
    .required(requiredFieldText),
  password: yup
    .string()
    .min(5, getLengthErrorText(5))
    .required(requiredFieldText)
});
