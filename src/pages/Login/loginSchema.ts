import * as yup from 'yup';
import {
  getLengthErrorText,
  requiredFieldText,
  validateEmailText
} from 'utils/constants';

export const loginSchema = yup.object({
  email: yup.string().email(validateEmailText).required(requiredFieldText),
  password: yup
    .string()
    .min(5, getLengthErrorText(5))
    .required(requiredFieldText)
});
