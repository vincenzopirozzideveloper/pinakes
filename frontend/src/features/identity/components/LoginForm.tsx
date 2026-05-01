import { useState, type FormEvent } from 'react';
import { useRouter } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../api/auth.api';
import { queryKeys } from '@/shared/api/queryKeys';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Logo } from '@/components/Logo';
import axios from 'axios';

export function LoginForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.me(), user);
      void router.navigate({ to: '/app' });
    },
    onError: (err) => {
      if (axios.isAxiosError(err) && err.response?.status === 422) {
        const errors = (err.response.data as { errors?: Record<string, string[]> }).errors ?? {};
        const flat: Record<string, string> = {};
        for (const [k, v] of Object.entries(errors)) {
          flat[k] = v[0] ?? '';
        }
        setFieldErrors(flat);
      }
    },
  });

  const globalError =
    !axios.isAxiosError(error) || error.response?.status !== 422
      ? (error as Error | null)?.message
      : null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    mutate();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-primary px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center text-center gap-3">
          <Logo size={40} className="text-accent" />
          <div>
            <CardTitle className="font-serif text-2xl">Accedi a Pinakes</CardTitle>
            <CardDescription className="mt-1">
              Il tuo catalogo personale di pensiero.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            {globalError && (
              <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {globalError}
              </p>
            )}

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@esempio.it"
                required
                aria-invalid={!!fieldErrors['email']}
                aria-describedby={fieldErrors['email'] ? 'email-error' : undefined}
              />
              {fieldErrors['email'] && (
                <p id="email-error" className="text-xs text-destructive">
                  {fieldErrors['email']}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-invalid={!!fieldErrors['password']}
                aria-describedby={fieldErrors['password'] ? 'password-error' : undefined}
              />
              {fieldErrors['password'] && (
                <p id="password-error" className="text-xs text-destructive">
                  {fieldErrors['password']}
                </p>
              )}
            </div>

            <Button type="submit" disabled={isPending} className="w-full mt-2">
              {isPending ? 'Accesso in corso...' : 'Accedi'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
