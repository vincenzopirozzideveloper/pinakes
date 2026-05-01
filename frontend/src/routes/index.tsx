import { createFileRoute } from '@tanstack/react-router';
import { PublicLayout } from '@/app/layouts/PublicLayout';
import { Logo } from '@/components/Logo';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <PublicLayout>
      <section className="container mx-auto max-w-content py-24 px-4">
        <Logo size={64} className="text-accent mb-12" />
        <h1 className="font-serif text-5xl font-semibold mb-6">Pinakes</h1>
        <p className="font-serif text-xl text-text-secondary leading-relaxed max-w-prose">
          Catalogo personale di pensiero. Ispirato ai Pinakes di Callimaco,
          la prima tassonomia sistematica della letteratura greca.
        </p>
      </section>
    </PublicLayout>
  );
}
