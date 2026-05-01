import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const BREAKPOINTS: { name: Breakpoint; minWidth: number }[] = [
  { name: '2xl', minWidth: 1536 },
  { name: 'xl', minWidth: 1280 },
  { name: 'lg', minWidth: 1024 },
  { name: 'md', minWidth: 768 },
  { name: 'sm', minWidth: 640 },
  { name: 'xs', minWidth: 0 },
];

function getCurrentBreakpoint(): Breakpoint {
  const w = window.innerWidth;
  for (const bp of BREAKPOINTS) {
    if (w >= bp.minWidth) return bp.name;
  }
  return 'xs';
}

const ALL_NAMES: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

export function BreakpointIndicator() {
  const [current, setCurrent] = useState<Breakpoint>('xs');

  useEffect(() => {
    const update = () => setCurrent(getCurrentBreakpoint());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed bottom-3 left-3 z-[9999] flex items-center gap-1.5 font-mono text-[11px] leading-none select-none pointer-events-none"
    >
      {ALL_NAMES.map((bp) => (
        <span
          key={bp}
          className={cn(
            'transition-colors duration-100',
            bp === current ? 'text-[#e5e5e5] font-bold' : 'text-[#404040]'
          )}
        >
          {bp}
        </span>
      ))}
    </div>
  );
}
