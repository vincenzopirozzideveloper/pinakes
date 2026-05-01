import { createRouter } from '@tanstack/react-router';
import { routeTree } from '@/routeTree.gen';
import { queryClient } from '@/app/providers/QueryProvider';

export const router = createRouter({
  routeTree,
  context: { queryClient, auth: { user: null } },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
