import { useState, useCallback } from 'react';
import { useRouter } from '@tanstack/react-router';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { useHotkey } from '@/shared/hooks/useHotkey';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { FileText, Home, LogIn, Search } from 'lucide-react';

interface QuickAction {
  id: string;
  label: string;
  shortcut?: string;
  icon: React.ReactNode;
  onSelect: () => void;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 250);
  const router = useRouter();

  const toggle = useCallback(() => setOpen((prev) => !prev), []);
  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
  }, []);

  useHotkey('k', toggle, { modifiers: ['meta'] });
  useHotkey('k', toggle, { modifiers: ['ctrl'] });

  const quickActions: QuickAction[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="size-4" />,
      onSelect: () => {
        void router.navigate({ to: '/' });
        close();
      },
    },
    {
      id: 'login',
      label: 'Accedi',
      icon: <LogIn className="size-4" />,
      onSelect: () => {
        void router.navigate({ to: '/login' });
        close();
      },
    },
  ];

  const hasSearchQuery = debouncedQuery.trim().length > 1;

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command shouldFilter={false}>
        <CommandInput
          placeholder="Cerca o esegui un'azione..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>
            {hasSearchQuery ? (
              <span className="flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground">
                <Search className="size-4" />
                Nessun risultato per &ldquo;{debouncedQuery}&rdquo;
              </span>
            ) : (
              <span className="text-sm text-muted-foreground">Digita per cercare.</span>
            )}
          </CommandEmpty>

          {!hasSearchQuery && (
            <CommandGroup heading="Azioni rapide">
              {quickActions.map((action) => (
                <CommandItem key={action.id} onSelect={action.onSelect} className="gap-2">
                  {action.icon}
                  <span>{action.label}</span>
                  {action.shortcut && (
                    <kbd className="ml-auto text-xs text-muted-foreground">{action.shortcut}</kbd>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {hasSearchQuery && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Risultati di ricerca">
                <CommandItem disabled className="gap-2 opacity-60">
                  <FileText className="size-4" />
                  <span className="text-sm text-muted-foreground">
                    La ricerca richiede un workspace attivo.
                  </span>
                </CommandItem>
              </CommandGroup>
            </>
          )}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
