import * as yup from 'yup';
import { loginSchema as schema } from 'utils/yupSchemes';

export const loginSchema = yup.object().shape(schema);
