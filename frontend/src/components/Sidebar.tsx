import { Link, useRouterState } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

interface SidebarItem {
  label: string;
  to: string;
}

const NAV_ITEMS: SidebarItem[] = [
  { label: 'dashboard', to: '/app/w/vincenzo' },
  { label: 'notes', to: '/app/w/vincenzo/notes' },
  { label: 'articles', to: '/app/w/vincenzo/articles' },
  { label: 'bookmarks', to: '/app/w/vincenzo/bookmarks' },
  { label: 'topics', to: '/app/w/vincenzo/topics' },
  { label: 'settings', to: '/app/w/vincenzo/settings' },
];

export function Sidebar() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  function isActive(to: string) {
    if (to === '/app/w/vincenzo') return currentPath === to;
    return currentPath === to || currentPath.startsWith(to + '/');
  }

  return (
    <aside
      className="hidden md:flex flex-col w-60 shrink-0 bg-[var(--color-canvas)] border-r border-[var(--color-hairline)] sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto"
      aria-label="Navigazione workspace"
    >
      {/* Workspace label */}
      <div className="px-6 pt-6 pb-3">
        <p className="text-[11px] font-bold tracking-[1.5px] uppercase text-[var(--color-muted-soft)] select-none">
          vincenzo
        </p>
      </div>

      <nav className="px-3 pb-6 flex flex-col gap-0.5">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'flex items-center gap-2.5 px-3 h-9 text-[13px] font-normal no-underline transition-colors duration-[var(--duration-fast)]',
                active
                  ? 'text-[var(--color-ink)] bg-[var(--color-surface-soft)]'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface-soft)]'
              )}
            >
              {active && (
                <span
                  className="w-1 h-1 rounded-full bg-[var(--color-primary)] shrink-0"
                  aria-hidden="true"
                />
              )}
              {!active && <span className="w-1 shrink-0" aria-hidden="true" />}
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
