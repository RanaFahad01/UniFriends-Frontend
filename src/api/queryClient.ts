import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2 minutes — don't refetch if data is fresh
      retry: 1, // retry once on failure before showing error
    },
  },
});
