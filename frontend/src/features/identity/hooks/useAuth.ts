import { useQuery } from '@tanstack/react-query';
import { fetchMe } from '../api/auth.api';
import { queryKeys } from '@/shared/api/queryKeys';

export function useAuth() {
  return useQuery({
    queryKey: queryKeys.me(),
    queryFn: fetchMe,
    retry: false,
    staleTime: 10 * 60_000,
  });
}
