import { MutationCache, QueryCache, QueryClient } from 'react-query';
import { errorNotification } from 'components/Snackbar/Snackbar';
import { parseErrorCode } from 'utils/parseErrorCode';
import { QueryError } from 'models/queryError';
import { getErrorMessage } from 'utils/getErrorMessage';
import { serverErrorText } from 'utils/constants';

export const errorNotificationHandler = (error: QueryError) => {
  if (
    error?.response?.config?.method !== 'get' &&
    parseErrorCode(error) !== 'invalid_credentials'
  ) {
    errorNotification(
      getErrorMessage(parseErrorCode(error)) || serverErrorText
    );
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      retryOnMount: false
    }
  },
  queryCache: new QueryCache({
    onError: (error) => errorNotificationHandler(error as QueryError)
  }),
  mutationCache: new MutationCache({
    onError: (error) => errorNotificationHandler(error as QueryError)
  })
});
