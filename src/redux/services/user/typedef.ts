import { UserType } from 'api/models/UserType';

export type UserStateType = {
  data: null | UserType;
  loading: boolean;
  error: null | unknown;
  validationError: null | unknown;
};
