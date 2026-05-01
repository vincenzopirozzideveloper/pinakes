import type { ReactNode } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RootLayout } from './RootLayout';

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <RootLayout>
      <Header variant="public" />
      <main className="flex-1">{children}</main>
      <Footer />
    </RootLayout>
  );
}
