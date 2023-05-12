import { FindUsersEnum, SearchingUsersRequest } from 'api/models/UserType';

export const defaultValues: SearchingUsersRequest = {
  searchType: FindUsersEnum.FullName,
  value: ''
};
