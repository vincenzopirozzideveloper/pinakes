import { Link } from '@tanstack/react-router';
import { Github, Linkedin, Rss, Mail } from 'lucide-react';
import { Logo } from '@/components/Logo';

const GARDEN_LINKS = [
  { label: 'Notes', to: '/g/vincenzo' },
  { label: 'Articles', to: '/g/vincenzo/articles' },
  { label: 'Bookmarks', to: '/g/vincenzo/bookmarks' },
  { label: 'Collections', to: '/g/vincenzo/collections' },
  { label: 'Topics', to: '/g/vincenzo/topics' },
];

const TOPICS_LINKS = [
  { label: 'Engineering', to: '/g/vincenzo/topics/engineering' },
  { label: 'Philosophy', to: '/g/vincenzo/topics/philosophy' },
  { label: 'Productivity', to: '/g/vincenzo/topics/productivity' },
  { label: 'Reading', to: '/g/vincenzo/topics/reading' },
  { label: 'Sketches', to: '/g/vincenzo/topics/sketches' },
];

const CONNECT_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/vincenzopirozzideveloper',
    icon: Github,
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/vincenzo-pirozzi',
    icon: Linkedin,
    external: true,
  },
  { label: 'RSS', href: '/feed.xml', icon: Rss, external: false },
  { label: 'Email', href: 'mailto:dev@sagresgestioni.it', icon: Mail, external: false },
];

const linkClass =
  'text-[13px] text-[var(--color-muted)] hover:text-[var(--color-ink)] no-underline transition-colors duration-[var(--duration-fast)] leading-relaxed';

const colHeadClass =
  'text-[11px] font-bold tracking-[1.5px] uppercase text-[var(--color-muted-soft)] mb-5 select-none';

export function Footer() {
  return (
    <footer className="bg-[var(--color-canvas)] border-t border-[var(--color-hairline)] mt-auto">
      <div className="mx-auto max-w-[1440px] px-6 pt-20 pb-10">
        {/* 12-col grid: col-span-4 brand / 2 garden / 2 topics / 2 connect */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 mb-16">

          {/* Brand col — 4 wide */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link to="/" className="inline-flex items-center gap-2.5 no-underline group w-fit">
              <Logo size={24} className="text-[var(--color-ink)]" />
              <span className="text-[15px] font-medium text-[var(--color-ink)] leading-none">
                pinakes{' '}
                <span className="font-mono text-[13px] text-[var(--color-muted)] font-normal">
                  :wiki
                </span>
              </span>
            </Link>
            <p className="text-[13px] text-[var(--color-muted)] leading-relaxed max-w-[28ch]">
              Pinakes is Vincenzo's personal wiki and digital garden. Notes, articles, bookmarks, sketches.
            </p>
            <Link
              to="/about"
              className="text-[13px] text-[var(--color-primary)] hover:text-[var(--color-primary-active)] no-underline font-medium transition-colors duration-[var(--duration-fast)]"
            >
              About this site &rarr;
            </Link>
          </div>

          {/* Garden col — 2 wide */}
          <div className="lg:col-span-2">
            <p className={colHeadClass}>Garden</p>
            <ul className="flex flex-col gap-2.5">
              {GARDEN_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics col — 2 wide */}
          <div className="lg:col-span-2">
            <p className={colHeadClass}>Topics</p>
            <ul className="flex flex-col gap-2.5">
              {TOPICS_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect col — 2 wide */}
          <div className="lg:col-span-2">
            <p className={colHeadClass}>Connect</p>
            <ul className="flex flex-col gap-3">
              {CONNECT_LINKS.map((l) => {
                const Icon = l.icon;
                const inner = (
                  <span className="inline-flex items-center gap-2.5">
                    <Icon size={14} className="shrink-0 text-[var(--color-muted-soft)]" />
                    {l.label}
                  </span>
                );
                return (
                  <li key={l.label}>
                    {l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        {inner}
                      </a>
                    ) : (
                      <a href={l.href} className={linkClass}>
                        {inner}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-[var(--color-hairline)] pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-[12px] font-mono text-[var(--color-muted-soft)] tracking-tight">
            Made with care &middot; Vincenzo Pirozzi
          </p>
          <p className="text-[12px] font-mono text-[var(--color-muted-soft)] tracking-tight">
            &copy; 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
