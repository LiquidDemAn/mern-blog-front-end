export type QueryError = {
  response: {
    data: {
      code?: string;
    };
    config: {
      method?: string;
    };
  };
};
