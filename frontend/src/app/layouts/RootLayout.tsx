import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export function RootLayout() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Vai al contenuto principale
      </a>

      <Outlet />

      {import.meta.env.DEV && (
        <TanStackRouterDevtools position="bottom-right" />
      )}
    </>
  );
}
