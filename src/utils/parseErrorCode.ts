import { QueryError } from 'models/queryError';

export const parseErrorCode = (error: QueryError) => {
  return error?.response?.data?.code;
};
