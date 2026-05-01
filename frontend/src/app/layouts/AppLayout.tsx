import type { ReactNode } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { BookOpen, Home, Search, Settings, Tag } from 'lucide-react';
import { Header } from '@/components/Header';
import { RootLayout } from './RootLayout';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  to: string;
  icon: ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', to: '/app', icon: <Home className="size-4" /> },
  { label: 'Note', to: '/app', icon: <BookOpen className="size-4" /> },
  { label: 'Tag', to: '/app', icon: <Tag className="size-4" /> },
  { label: 'Cerca', to: '/app', icon: <Search className="size-4" /> },
  { label: 'Impostazioni', to: '/app', icon: <Settings className="size-4" /> },
];

function Sidebar() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-border min-h-[calc(100vh-3.5rem)] pt-4 pb-8 px-2 bg-bg-secondary">
      <nav className="flex flex-col gap-0.5">
        {NAV_ITEMS.map((item) => {
          const isActive = currentPath === item.to || currentPath.startsWith(item.to + '/');
          return (
            <Link
              key={item.label}
              to={item.to}
              className={cn(
                'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-accent/10 text-accent font-medium'
                  : 'text-text-secondary hover:bg-bg-primary hover:text-text-primary'
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <RootLayout>
      <Header variant="app" />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0 p-6">{children}</main>
      </div>
    </RootLayout>
  );
}
