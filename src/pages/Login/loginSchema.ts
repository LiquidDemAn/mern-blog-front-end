import * as yup from 'yup';
import {
  emailValidationText,
  getLengthErrorText,
  requiredFieldText
} from 'utils/constants';

export const loginSchema = yup.object({
  email: yup.string().email(emailValidationText).required(requiredFieldText),
  password: yup
    .string()
    .min(5, getLengthErrorText(5))
    .required(requiredFieldText)
});
