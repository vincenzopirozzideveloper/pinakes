import { createFileRoute, redirect } from '@tanstack/react-router';
import { fetchMe } from '@/features/identity/api/auth.api';
import { queryKeys } from '@/shared/api/queryKeys';
import { LoginForm } from '@/features/identity/components/LoginForm';

export const Route = createFileRoute('/login')({
  beforeLoad: async ({ context }) => {
    try {
      await context.queryClient.ensureQueryData({
        queryKey: queryKeys.me(),
        queryFn: fetchMe,
      });
      throw redirect({ to: '/app' });
    } catch (err) {
      if (err instanceof Response || (err as { _isRedirect?: boolean })?._isRedirect) {
        throw err;
      }
    }
  },
  component: LoginPage,
});

function LoginPage() {
  return <LoginForm />;
}
