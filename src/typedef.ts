export type ErrorType = {
  status?: number;
  message?: string;
};

export enum PathsEnum {
  Server = 'http://localhost:4444/',
  Home = '/',
  Register = 'register',
  Login = '/login',
  FullPost = 'posts/:id',
  EditPost = 'posts/:id/edit',
  CreatePost = 'create/post',
  Tag = 'tags/:tag',
  Profile = ':nickName'
}

export enum TabsEnum {
  New = 'New',
  Popular = 'Popular',
  Posts = 'Posts',
  Followers = 'Followers',
  Following = 'Following',
  FindPerson = 'Find Person'
}

export type ErrorDataType = {
  message?: string;
  code?: ErrorsCodes;
};

export enum ErrorsCodes {
  NOT_FOUND = 'not_found',
  DUPLICATE_NOTIFICATION = 'duplicate_notification',
  INVALID_REQUEST_PARAMS = 'invalid_request_params',
  INVALID_CREDENTIALS = 'invalid_credentials',
  INVALID_FILE_FORMAT = 'invalid_file_format',
  INVALID_DOCUMENT = 'invalid_document',
  NEED_AUTH_REFRESH = 'need_auth_refresh',
  NOT_FOUND_USER = 'not_found_user',
  UNAUTHORIZED = 'unauthorized',
  INTEGRATION_ERROR = 'integration_error',
  SERVER_ERROR = 'server_error',
  EMAIL_RESERVED = 'email_reserved',
  REQUIRES_CONTRACT_SIGNED_DOCUMENT = 'requires_contract_signed_document'
}

export enum BreakpointsEnum {
  Small = 576,
  Medium = 768,
  Large = 992,
  Extra = 1200
}
