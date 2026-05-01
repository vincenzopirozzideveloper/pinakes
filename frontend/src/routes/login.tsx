import { useState, type FormEvent } from 'react';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, ArrowRight } from 'lucide-react';
import axios from 'axios';

import { login } from '@/features/identity/api/auth.api';
import { fetchMe } from '@/features/identity/api/auth.api';
import { queryKeys } from '@/shared/api/queryKeys';
import { Input } from '@/components/ui/Input';

// ─── Route ───────────────────────────────────────────────────────────────────

export const Route = createFileRoute('/login')({
  beforeLoad: async ({ context }) => {
    try {
      await context.queryClient.ensureQueryData({
        queryKey: queryKeys.me(),
        queryFn: fetchMe,
      });
      throw redirect({ to: '/app' });
    } catch (err) {
      if (
        err instanceof Response ||
        (err as { _isRedirect?: boolean })?._isRedirect
      ) {
        throw err;
      }
    }
  },
  component: LoginPage,
});

// ─── Page ─────────────────────────────────────────────────────────────────────

function LoginPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.me(), user);
      void navigate({ to: '/app' });
    },
    onError: (err) => {
      if (axios.isAxiosError(err) && err.response?.status === 422) {
        const raw =
          (err.response.data as { errors?: Record<string, string[]> }).errors ??
          {};
        const flat: Record<string, string> = {};
        for (const [k, v] of Object.entries(raw)) {
          flat[k] = v[0] ?? '';
        }
        setFieldErrors(flat);
      }
    },
  });

  const globalError =
    error !== null &&
    !(axios.isAxiosError(error) && error.response?.status === 422)
      ? (error as Error).message
      : null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});
    mutate();
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{
        background: `
          radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.015) 0%, transparent 70%),
          radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)
        `,
        backgroundSize: 'auto, 24px 24px',
        backgroundColor: 'var(--color-canvas)',
      }}
    >
      {/* ── Card ── */}
      <div
        className="w-full animate-slide-up"
        style={{ maxWidth: '420px' }}
      >
        <div
          style={{
            background: 'var(--color-surface-1)',
            border: '1px solid var(--color-border-hairline)',
            borderRadius: '12px',
            padding: '40px',
          }}
        >
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div
              style={{
                width: '32px',
                height: '32px',
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border-hairline)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: 'var(--color-fg)',
                  lineHeight: 1,
                  userSelect: 'none',
                }}
                aria-hidden="true"
              >
                &#928;
              </span>
            </div>
          </div>

          {/* Microcopy */}
          <p
            className="text-center"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-fg-tertiary)',
              marginBottom: '16px',
            }}
          >
            PINAKES &mdash; PERSONAL WIKI
          </p>

          {/* Headline */}
          <h1
            className="text-center"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '28px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--color-fg)',
              lineHeight: 1.15,
              marginBottom: '8px',
            }}
          >
            Welcome back.
          </h1>

          {/* Subline */}
          <p
            className="text-center"
            style={{
              fontSize: '14px',
              color: 'var(--color-fg-muted)',
              marginBottom: '32px',
              lineHeight: 1.5,
            }}
          >
            Sign in to access your private notes.
          </p>

          {/* Global error banner */}
          {globalError !== null && (
            <div
              role="alert"
              style={{
                background: 'var(--color-surface-2)',
                border: '1px solid #ef4444',
                borderRadius: '6px',
                padding: '10px 14px',
                marginBottom: '20px',
                fontSize: '13px',
                color: '#ef4444',
              }}
            >
              {globalError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <Input
              id="login-email"
              type="email"
              label="Email"
              autoComplete="email"
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={fieldErrors['email']}
              required
              aria-invalid={!!fieldErrors['email']}
              aria-describedby={
                fieldErrors['email'] ? 'login-email-error' : undefined
              }
            />

            <Input
              id="login-password"
              type="password"
              label="Password"
              autoComplete="current-password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={fieldErrors['password']}
              required
              aria-invalid={!!fieldErrors['password']}
              aria-describedby={
                fieldErrors['password'] ? 'login-password-error' : undefined
              }
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="btn-pill-primary w-full mt-2 gap-2"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                height: '44px',
                fontSize: '14px',
                fontWeight: 600,
                opacity: isPending ? 0.6 : 1,
                cursor: isPending ? 'not-allowed' : 'pointer',
                transition:
                  'background 150ms ease, opacity 150ms ease',
              }}
            >
              {isPending ? (
                <Loader2 size={15} className="animate-spin" aria-hidden="true" />
              ) : (
                <ArrowRight size={15} aria-hidden="true" />
              )}
              {isPending ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Footer links */}
          <div
            className="hairline-x"
            style={{ marginTop: '24px', paddingTop: '20px' }}
          >
            <p
              className="text-center"
              style={{
                fontSize: '13px',
                color: 'var(--color-fg-tertiary)',
              }}
            >
              Forgot password?{' '}
              <span
                aria-hidden="true"
                style={{ margin: '0 4px', color: 'var(--color-fg-quaternary)' }}
              >
                &middot;
              </span>{' '}
              <a
                href="/"
                style={{
                  color: 'var(--color-fg-tertiary)',
                  textDecoration: 'none',
                  borderBottom:
                    '1px solid var(--color-border-hairline)',
                  paddingBottom: '1px',
                  transition: 'color 150ms ease, border-color 150ms ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    'var(--color-fg-muted)';
                  (e.currentTarget as HTMLAnchorElement).style.borderBottomColor =
                    'var(--color-border-strong)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    'var(--color-fg-tertiary)';
                  (e.currentTarget as HTMLAnchorElement).style.borderBottomColor =
                    'var(--color-border-hairline)';
                }}
              >
                Public garden
              </a>{' '}
              &rarr;
            </p>
          </div>
        </div>
      </div>

      {/* Version watermark */}
      <p
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          fontWeight: 400,
          color: 'var(--color-fg-quaternary)',
          letterSpacing: '0.06em',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        Pinakes v0.1 &middot; 2026
      </p>
    </div>
  );
}
