import { useInfiniteQuery } from '@tanstack/react-query';
import { apiFetch } from '@/api/client';
import type { ChatMessage } from '@/types/chat';
import type { Page } from '@/types/pagination';

export function useMessageHistory(leagueId: number, enabled: boolean) {
  const query = useInfiniteQuery<Page<ChatMessage>>({
    queryKey: ['chat', 'messages', leagueId],
    queryFn: ({ pageParam }) =>
      apiFetch<Page<ChatMessage>>(`/api/leagues/${leagueId}/messages?page=${pageParam}`),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.page.number < lastPage.page.totalPages - 1
        ? lastPage.page.number + 1
        : undefined,
    enabled,
  });

  const messages = query.data?.pages.flatMap((p) => p.content).reverse() ?? [];

  return {
    messages,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
