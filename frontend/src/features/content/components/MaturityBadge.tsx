import { Sprout, BookOpen, Leaf, Archive } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type MaturityStage = 'seedling' | 'budding' | 'evergreen' | 'archived';

interface MaturityConfig {
  label: string;
  icon: React.ReactNode;
  className: string;
}

const MATURITY_CONFIG: Record<MaturityStage, MaturityConfig> = {
  seedling: {
    label: 'Germoglio',
    icon: <Sprout className="size-3" />,
    className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
  },
  budding: {
    label: 'In crescita',
    icon: <BookOpen className="size-3" />,
    className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800',
  },
  evergreen: {
    label: 'Sempreverde',
    icon: <Leaf className="size-3" />,
    className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800',
  },
  archived: {
    label: 'Archiviato',
    icon: <Archive className="size-3" />,
    className: 'bg-gray-100 text-gray-600 dark:bg-gray-800/50 dark:text-gray-400 border-gray-200 dark:border-gray-700',
  },
};

interface MaturityBadgeProps {
  stage: MaturityStage;
  className?: string;
}

export function MaturityBadge({ stage, className }: MaturityBadgeProps) {
  const config = MATURITY_CONFIG[stage];

  return (
    <Badge
      variant="outline"
      className={cn('inline-flex items-center gap-1 text-xs font-medium', config.className, className)}
    >
      {config.icon}
      {config.label}
    </Badge>
  );
}
