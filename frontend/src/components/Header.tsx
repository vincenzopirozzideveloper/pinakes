import { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { NavChipTop } from '@/components/ui/NavChipTop';
import { cn } from '@/lib/utils';

const PUBLIC_NAV = [
  { label: 'Garden', to: '/g/vincenzo' },
  { label: 'Topics', to: '/g/vincenzo/topics' },
  { label: 'About', to: '/about' },
];

export function Header() {
  const routerState = useRouterState();
  const path = routerState.location.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(to: string) {
    if (to === '/g/vincenzo') return path === to;
    return path === to || path.startsWith(to + '/');
  }

  return (
    <>
      <header
        className="sticky top-0 z-40 h-16 bg-[var(--color-canvas)]/95 backdrop-blur-sm border-b border-[var(--color-hairline)]"
        aria-label="Navigazione principale"
      >
        <div className="mx-auto max-w-[1440px] px-6 h-full grid grid-cols-3 items-center">
          {/* Left — empty spacer (mirrors right width) */}
          <div className="flex items-center" />

          {/* Center — brand block */}
          <div className="flex items-center justify-center">
            <Link
              to="/"
              className="flex items-center gap-2.5 no-underline group"
              aria-label="Pinakes — homepage"
            >
              <span
                aria-hidden="true"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  background: '#0a0a0a',
                  color: '#fafafa',
                  border: '1px solid rgba(255,255,255,0.18)',
                  fontFamily: "'Times New Roman', Georgia, serif",
                  fontSize: '15px',
                  fontWeight: 600,
                  lineHeight: 1,
                  letterSpacing: 0,
                  flexShrink: 0,
                  userSelect: 'none',
                  paddingBottom: '1px',
                }}
              >
                Π
              </span>
              <span className="text-[15px] font-medium text-[var(--color-ink)] leading-none tracking-tight select-none">
                pinakes{' '}
                <span className="font-mono text-[13px] text-[var(--color-muted)] font-normal">
                  :wiki
                </span>
              </span>
            </Link>
          </div>

          {/* Right — chip + nav links + mobile trigger */}
          <div className="flex items-center justify-end gap-5">
            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-5" aria-label="Sezioni">
              <NavChipTop
                label="Personal Playbook v.1"
                className="bg-[var(--color-surface-soft)] border-[var(--color-hairline)] text-[var(--color-muted)]"
              />
              {PUBLIC_NAV.map((item) => {
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      'relative text-[14px] font-medium no-underline transition-colors duration-[var(--duration-fast)]',
                      active
                        ? 'text-[var(--color-ink)]'
                        : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                    )}
                  >
                    {active && (
                      <span
                        className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[var(--color-primary)]"
                        aria-hidden="true"
                      />
                    )}
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center h-8 px-3 bg-[var(--color-surface-soft)] border border-[var(--color-hairline)] rounded-[var(--radius-pill)] text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
              aria-label={mobileOpen ? 'Chiudi menu' : 'Apri menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          'fixed top-16 right-0 bottom-0 z-40 w-72 bg-[var(--color-canvas)] border-l border-[var(--color-hairline)] flex flex-col p-6 gap-1 md:hidden transition-transform duration-[var(--duration-moderate)]',
          mobileOpen ? 'translate-x-0 animate-slide-in-right' : 'translate-x-full'
        )}
        aria-label="Menu mobile"
        aria-hidden={!mobileOpen}
      >
        <div className="mb-6">
          <NavChipTop
            label="Personal Playbook v.1"
            className="bg-[var(--color-surface-soft)] border-[var(--color-hairline)] text-[var(--color-muted)]"
          />
        </div>
        {PUBLIC_NAV.map((item) => {
          const active = isActive(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-4 h-11 text-[14px] font-medium no-underline transition-colors',
                active
                  ? 'text-[var(--color-ink)] bg-[var(--color-surface-soft)]'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface-soft)]'
              )}
            >
              {active && (
                <span className="w-1 h-1 rounded-full bg-[var(--color-primary)] shrink-0" aria-hidden="true" />
              )}
              {item.label}
            </Link>
          );
        })}
      </aside>
    </>
  );
}
