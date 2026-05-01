import { createRootRouteWithContext, Outlet, ScrollRestoration } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';
import { CommandPalette } from '@/features/search/components/CommandPalette';

interface RouterContext {
  queryClient: QueryClient;
  auth: { user: unknown | null };
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
      <CommandPalette />
    </>
  );
}
