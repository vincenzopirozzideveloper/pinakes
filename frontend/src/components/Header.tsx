import { Link } from '@tanstack/react-router';
import { Command, ChevronDown, User, LogOut, Settings } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/identity/hooks/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '@/features/identity/api/auth.api';
import { queryKeys } from '@/shared/api/queryKeys';

interface HeaderProps {
  variant?: 'public' | 'app';
}

function WorkspaceSwitcher() {
  return (
    <Button variant="ghost" size="sm" className="gap-1.5 text-sm font-medium">
      <span className="text-muted-foreground">workspace</span>
      <ChevronDown className="size-3.5 opacity-60" />
    </Button>
  );
}

function CommandPaletteButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      className="hidden md:inline-flex items-center gap-2 text-muted-foreground text-xs w-48 justify-between"
      onClick={() => {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true }));
      }}
    >
      <span className="flex items-center gap-1.5">
        <Command className="size-3" />
        Cerca...
      </span>
      <kbd className="text-[10px] tracking-widest">K</kbd>
    </Button>
  );
}

function UserMenu() {
  const { data: user } = useAuth();
  const queryClient = useQueryClient();

  const { mutate: handleLogout } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.removeQueries({ queryKey: queryKeys.me() });
      window.location.href = '/login';
    },
  });

  if (!user) return null;

  return (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="icon" asChild>
        <Link to="/app">
          <User className="size-4" />
          <span className="sr-only">Profilo</span>
        </Link>
      </Button>
      <Button variant="ghost" size="icon" title="Impostazioni">
        <Settings className="size-4" />
        <span className="sr-only">Impostazioni</span>
      </Button>
      <Button variant="ghost" size="icon" title="Esci" onClick={() => handleLogout()}>
        <LogOut className="size-4" />
        <span className="sr-only">Esci</span>
      </Button>
    </div>
  );
}

export function Header({ variant = 'public' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-bg-primary/80 backdrop-blur-sm">
      <div className="container mx-auto max-w-content flex h-14 items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 text-accent hover:opacity-80 transition-opacity">
            <Logo size={24} className="text-accent" />
            <span className="font-serif font-semibold text-lg">Pinakes</span>
          </Link>
          {variant === 'app' && <WorkspaceSwitcher />}
        </div>

        <div className="flex items-center gap-2">
          <CommandPaletteButton />
          {variant === 'app' ? (
            <UserMenu />
          ) : (
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Accedi</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
