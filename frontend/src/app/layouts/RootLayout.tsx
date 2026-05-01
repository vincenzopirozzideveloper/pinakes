import type { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary antialiased">
      {children}
    </div>
  );
}
