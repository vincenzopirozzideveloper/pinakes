import type { ReactNode } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Footer } from '@/components/Footer';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const routerState = useRouterState();
  const isDashboard = routerState.location.pathname === '/app/w/vincenzo';

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-canvas)]">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main
          id="main-content"
          className="flex-1 flex flex-col min-w-0"
        >
          <div className="flex-1 px-8 py-8">
            {children}
          </div>

          {isDashboard && <Footer />}
        </main>
      </div>
    </div>
  );
}
