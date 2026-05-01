import { useState, useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type TocItem = {
  id: string;
  label: string;
  href?: string;
};

type TocSidebarProps = {
  items: TocItem[];
  children?: ReactNode;
  className?: string;
};

export function TocSidebar({ items, children, className }: TocSidebarProps) {
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sectionIds = items.map((item) => item.id);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [items]);

  return (
    <nav
      className={cn(
        'sticky top-24 flex flex-col gap-0.5',
        'pl-4 border-l border-[rgba(255,255,255,0.08)]',
        className
      )}
      aria-label="Table of contents"
    >
      {children}
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <a
            key={item.id}
            href={item.href ?? `#${item.id}`}
            className={cn(
              'flex items-center gap-2 py-1.5 text-[13px] leading-snug transition-colors duration-100 no-underline',
              isActive
                ? 'text-[#e5e5e5]'
                : 'text-[#525252] hover:text-[#a3a3a3]'
            )}
          >
            <span
              className={cn(
                'w-1 h-1 rounded-full shrink-0 transition-colors',
                isActive ? 'bg-[#e5e5e5]' : 'bg-transparent'
              )}
            />
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
