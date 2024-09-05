import { MutationCache, QueryClient, QueryClientConfig } from '@tanstack/react-query';

// Config object to be passed to queryClient on initialization
const queryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 10000,  // Prevents refetching to often because the APi blocks if too many requests arrive
    },
  },
  mutationCache: new MutationCache({
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })
};

export const queryClient = new QueryClient(queryConfig);