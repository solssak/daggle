import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: 300,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});
