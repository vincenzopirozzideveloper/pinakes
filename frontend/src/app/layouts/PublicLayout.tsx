import type { ReactNode } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-canvas)]">
      <Header />
      <main id="main-content" className="flex-1 min-h-screen">
        {children}
      </main>
      <Footer />
    </div>
  );
}
