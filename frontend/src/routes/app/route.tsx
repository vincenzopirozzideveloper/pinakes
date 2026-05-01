import { createFileRoute, redirect, Outlet } from '@tanstack/react-router';
import { fetchMe } from '@/features/identity/api/auth.api';
import { queryKeys } from '@/shared/api/queryKeys';
import { AppLayout } from '@/app/layouts/AppLayout';

export const Route = createFileRoute('/app')({
  beforeLoad: async ({ context }) => {
    try {
      await context.queryClient.ensureQueryData({
        queryKey: queryKeys.me(),
        queryFn: fetchMe,
      });
    } catch {
      throw redirect({ to: '/login' });
    }
  },
  component: AppRoute,
});

function AppRoute() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
