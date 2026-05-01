import { redirect, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/')({
  beforeLoad: () => {
    throw redirect({ to: '/app/w/$workspace', params: { workspace: 'vincenzo' } });
  },
  component: () => null,
});
