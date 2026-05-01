import { createFileRoute, Link } from '@tanstack/react-router';
import { PublicLayout } from '@/app/layouts/PublicLayout';
import { Card } from '@/components/ui/Card';
import { Stat } from '@/components/ui/Stat';
import {
  ArrowDown,
  ArrowRight,
  MessageSquare,
  Search,
  Scale,
  UserCheck,
  BookOpen,
  FileText,
  Hash,
  Globe,
  ExternalLink,
} from 'lucide-react';

export const Route = createFileRoute('/')({
  component: HomePage,
});

// ── TOC ────────────────────────────────────────────────────────────────────

type TocItem = { id: string; label: string };

const TOC_ITEMS: TocItem[] = [
  { id: 'mission',        label: 'The Mission'     },
  { id: 'shift',          label: 'The Shift'       },
  { id: 'thesis',         label: 'Our Thesis'      },
  { id: 'principles',     label: 'Principles'      },
  { id: 'values',         label: 'Values'          },
  { id: 'signals',        label: 'Signals'         },
  { id: 'further-reading',label: 'Further Reading' },
];

function TocSidebar({ items }: { items: TocItem[] }) {
  return (
    <nav
      aria-label="Page sections"
      className="hidden xl:flex flex-col gap-1 fixed top-1/2 right-8 -translate-y-1/2 z-30"
    >
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="
            text-[12px] font-mono text-[var(--color-fg-tertiary)]
            no-underline px-3 py-1 rounded-[var(--radius-sm)]
            hover:text-[var(--color-fg-muted)] transition-colors duration-150
            whitespace-nowrap
          "
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

// ── SECTION SHELL ──────────────────────────────────────────────────────────

function Section({
  id,
  children,
  className = '',
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`
        border-t border-[var(--color-border-hairline)]
        py-32 scroll-mt-20
        ${className}
      `}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* subtle vertical guide lines */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-y-0 left-0 right-0
            hidden lg:grid grid-cols-12 gap-6 opacity-[0.025]
          "
          style={{
            backgroundImage:
              'repeating-linear-gradient(to right, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 1px, transparent 1px, transparent calc(100% / 12))',
          }}
        />
        {children}
      </div>
    </section>
  );
}

function SectionMeta({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-[var(--color-fg-tertiary)] mb-4">
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-display-lg text-[var(--color-fg)] mb-3">
      {children}
    </h2>
  );
}

function SectionSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[18px] text-[var(--color-fg-muted)] mb-16 leading-relaxed">
      {children}
    </p>
  );
}

// ── MOCK DATA ──────────────────────────────────────────────────────────────

const MISSION_CARDS = [
  {
    tag: 'what i do now',
    title: 'Mission',
    body: 'Distill notes from engineering, philosophy, productivity and systems thinking into evergreen pieces that hold value over time. Every idea earns a permanent address in the garden.',
  },
  {
    tag: 'where we\'re going',
    title: 'Vision',
    body: 'A personal second-brain that compounds over years. Knowledge that connects laterally across disciplines, surfaces serendipitous links, and remains readable by future me and anyone curious enough to look.',
  },
];

const SHIFT_CARDS = [
  {
    title: 'Execution cost collapsed.',
    body: 'AI-assisted writing made drafting cheap. Friction is no longer the bottleneck — curation and judgment are. The value moved upstream.',
  },
  {
    title: 'Information density exploded.',
    body: 'More signal, more noise. Curation matters more than collection. Reading broadly without a filtering system produces nothing useful.',
  },
  {
    title: 'Memory must externalize.',
    body: 'If it is not written down with backlinks, it is lost. Notes are infrastructure. The mind is for processing, not for storing.',
  },
];

const THESIS_CARDS = [
  {
    title: 'Anyone (future me) can read this.',
    body: 'I write for a reader who shares my context but has forgotten the details. Every note assumes minimal short-term memory, maximum long-term curiosity.',
  },
  {
    title: 'Notes are atomic.',
    body: 'One idea per note. Zettelkasten-influenced. Atomic notes compose — long ones do not. Linking atomic ideas creates emergent structure.',
  },
  {
    title: 'Maturity matters.',
    body: 'Seedling, budding, evergreen. Not everything is finished. Tagging maturity prevents false authority and lets rough drafts exist in public honestly.',
  },
  {
    title: 'Public over private.',
    body: 'Default visibility is public unless there is a reason to hide. Working in the open creates accountability and occasionally helps a stranger.',
  },
];

type Principle = {
  icon: React.ElementType;
  name: string;
  question: string;
  description: string;
};

const PRINCIPLES: Principle[] = [
  {
    icon: MessageSquare,
    name: 'Articulation',
    question: 'Is the intent clear enough for a machine to execute it correctly?',
    description:
      'Making intent precise enough for machines to act on. Vague direction produces vague output. Specificity is a writing skill, not just a design skill.',
  },
  {
    icon: Search,
    name: 'Discovery',
    question: 'Did I confirm this is worth building before going deep?',
    description:
      'Testing whether something is worth building before committing. Exploration is the part of thinking that cannot be automated away.',
  },
  {
    icon: Scale,
    name: 'Judgment',
    question: 'Does this output answer the right problem in its context?',
    description:
      'Deciding what is worth building and what is not. The most valuable thing a person does is decide where to focus — not execute.',
  },
  {
    icon: UserCheck,
    name: 'Accountability',
    question: 'Is the ownership for this clear?',
    description:
      'Owning outcomes, not just tasks. Someone has to stand behind the release. Clear ownership prevents diffusion of responsibility.',
  },
];

type Value = {
  icon: React.ElementType;
  label: string;
  body: string;
};

const VALUES: Value[] = [
  {
    icon: BookOpen,
    label: 'Read widely',
    body: 'Inputs from outside your domain produce the unexpected connections that matter.',
  },
  {
    icon: FileText,
    label: 'Write to think',
    body: 'The act of writing surfaces what you do not actually understand yet.',
  },
  {
    icon: ArrowRight,
    label: 'Ship small',
    body: 'A published seedling beats a perfect draft that never leaves the editor.',
  },
  {
    icon: Globe,
    label: 'Work in public',
    body: 'Opacity is overhead. Transparency compounds trust and occasionally helps someone else.',
  },
  {
    icon: Hash,
    label: 'Link obsessively',
    body: 'Value lives in the connections, not in the nodes. Backlinks are the graph edges that make a garden.',
  },
];

const STATS: Array<{ value: string; label: string }> = [
  { value: '120',  label: 'notes published'  },
  { value: '18',   label: 'long-form articles' },
  { value: '45',   label: 'bookmarks curated' },
  { value: '12',   label: 'topics active'    },
  { value: '60%',  label: 'content public'   },
];

type Reading = {
  title: string;
  body: string;
  badge: 'internal' | 'external';
  href: string;
};

const FURTHER_READING: Reading[] = [
  {
    title: 'Zettelkasten essentials',
    body: 'The slip-box method distilled: atomic notes, permanent notes, and the folgezettel link that makes the system non-linear.',
    badge: 'internal',
    href: '/g/vincenzo/zettelkasten-essentials',
  },
  {
    title: 'How I write evergreen notes',
    body: 'The conventions I follow for a note to graduate from seedling to evergreen — title form, density, and backlink saturation.',
    badge: 'internal',
    href: '/g/vincenzo/how-i-write-evergreen-notes',
  },
  {
    title: 'Tools I\'d recommend',
    body: 'Obsidian, Pinakes, and a handful of browser extensions. Opinionated, minimal, all local-first where possible.',
    badge: 'internal',
    href: '/g/vincenzo/tools',
  },
];

// ── PAGE ───────────────────────────────────────────────────────────────────

function HomePage() {
  return (
    <PublicLayout>
      <TocSidebar items={TOC_ITEMS} />

      {/* ── 1. HERO ─────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: '80vh',
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '768px',
            margin: '0 auto',
            padding: '0 24px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--color-fg-tertiary)',
              marginBottom: '24px',
            }}
          >
            Personal Playbook · v.1
          </p>

          <h1
            style={{
              fontSize: 'clamp(48px, 7vw, 88px)',
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              color: 'var(--color-fg)',
              marginBottom: '24px',
            }}
          >
            Knowledge ships here.
          </h1>

          <p
            style={{
              fontSize: '18px',
              lineHeight: 1.5,
              color: 'var(--color-fg-muted)',
              maxWidth: '560px',
              margin: '0 auto 32px',
            }}
          >
            Vincenzo's living wiki — notes, articles, bookmarks, sketches. Built in the open.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Link
              to="/g/$workspace"
              params={{ workspace: 'vincenzo' }}
              className="btn-pill-primary no-underline inline-flex items-center gap-2"
            >
              Enter the garden
              <ArrowRight size={14} strokeWidth={2} />
            </Link>
            <a href="#mission" className="btn-pill-secondary no-underline">
              About this site
            </a>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-fg-tertiary)',
              letterSpacing: '0.08em',
            }}
          >
            scroll to explore
          </p>
          <ArrowDown size={12} strokeWidth={1.5} style={{ color: 'var(--color-fg-tertiary)' }} />
        </div>
      </section>

      {/* ── 2. MISSION ──────────────────────────────────────────────── */}
      <Section id="mission">
        <SectionMeta>2026 &middot; NOW &rarr;</SectionMeta>
        <SectionTitle>The mission</SectionTitle>
        <SectionSubtitle>What I'm building here.</SectionSubtitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {MISSION_CARDS.map((c) => (
            <Card key={c.title} variant="default" className="flex flex-col gap-4">
              <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-[var(--color-fg-tertiary)]">
                {c.tag}
              </p>
              <h3 className="text-title-lg text-[var(--color-fg)]">{c.title}</h3>
              <p className="text-body text-[var(--color-fg-muted)] leading-relaxed">{c.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── 3. THE SHIFT ────────────────────────────────────────────── */}
      <Section id="shift">
        <SectionMeta>2026 &middot; Q1 &rarr;</SectionMeta>
        <SectionTitle>The shift</SectionTitle>
        <SectionSubtitle>Three things changed at the same time.</SectionSubtitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SHIFT_CARDS.map((c) => (
            <Card key={c.title} variant="default" className="flex flex-col gap-4">
              <h3 className="text-title-md text-[var(--color-fg)]">{c.title}</h3>
              <p className="text-body-sm text-[var(--color-fg-muted)] leading-relaxed">{c.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── 4. THESIS ───────────────────────────────────────────────── */}
      <Section id="thesis">
        <SectionTitle>Our thesis</SectionTitle>
        <SectionSubtitle>Four claims behind this wiki.</SectionSubtitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {THESIS_CARDS.map((c) => (
            <Card key={c.title} variant="default" className="flex flex-col gap-4">
              <h3 className="text-title-md text-[var(--color-fg)]">{c.title}</h3>
              <p className="text-body-sm text-[var(--color-fg-muted)] leading-relaxed">{c.body}</p>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            to="/g/$workspace"
            params={{ workspace: 'vincenzo' }}
            className="btn-pill-primary no-underline inline-flex items-center gap-2"
          >
            Read the manifesto
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </Section>

      {/* ── 5. PRINCIPLES TABLE ─────────────────────────────────────── */}
      <Section id="principles">
        <SectionTitle>Working principles</SectionTitle>
        <SectionSubtitle>What I bring that AI cannot replace.</SectionSubtitle>

        <div className="w-full">
          {/* header row */}
          <div className="grid grid-cols-12 gap-6 pb-3 border-b border-[var(--color-border-hairline)]">
            <span className="col-span-3 text-[11px] font-mono uppercase tracking-[0.12em] text-[var(--color-fg-tertiary)]">
              Principle
            </span>
            <span className="col-span-4 text-[11px] font-mono uppercase tracking-[0.12em] text-[var(--color-fg-tertiary)]">
              Alignment question
            </span>
            <span className="col-span-5 text-[11px] font-mono uppercase tracking-[0.12em] text-[var(--color-fg-tertiary)]">
              Description
            </span>
          </div>

          {PRINCIPLES.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.name}
                className="grid grid-cols-12 gap-6 py-7 border-b border-[var(--color-border-hairline)] last:border-b-0"
              >
                <div className="col-span-3 flex items-start gap-3">
                  <Icon
                    size={16}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-[var(--color-fg-tertiary)]"
                  />
                  <div>
                    <p className="text-title-sm text-[var(--color-fg)]">{p.name}</p>
                  </div>
                </div>
                <p className="col-span-4 text-body-sm text-[var(--color-fg-muted)] leading-relaxed italic">
                  "{p.question}"
                </p>
                <p className="col-span-5 text-body-sm text-[var(--color-fg-muted)] leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ── 6. VALUES ───────────────────────────────────────────────── */}
      <Section id="values">
        <SectionTitle>Values</SectionTitle>
        <SectionSubtitle>Five pillars I keep coming back to.</SectionSubtitle>

        <div className="flex flex-col divide-y divide-[var(--color-border-hairline)]">
          {VALUES.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.label} className="flex items-start gap-5 py-6 first:pt-0 last:pb-0">
                <Icon
                  size={18}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-[var(--color-fg-tertiary)]"
                />
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6">
                  <span className="text-title-sm text-[var(--color-fg)] w-36 shrink-0">
                    {v.label}
                  </span>
                  <span className="text-body-sm text-[var(--color-fg-muted)] leading-relaxed">
                    {v.body}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ── 7. SIGNALS / STATS ──────────────────────────────────────── */}
      <Section id="signals">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {STATS.map((s) => (
            <Card key={s.label} variant="default" className="flex flex-col gap-2">
              <Stat value={s.value} label={s.label} />
            </Card>
          ))}
        </div>

        {/* inline CTA card */}
        <div className="card-bx flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 px-8 py-7">
          <p className="text-display-sm text-[var(--color-fg)]">
            Three years, still writing.
          </p>
          <Link
            to="/g/$workspace"
            params={{ workspace: 'vincenzo' }}
            className="btn-pill-primary no-underline inline-flex items-center gap-2 shrink-0"
          >
            Read the latest
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </Section>

      {/* ── 8. FURTHER READING ──────────────────────────────────────── */}
      <Section id="further-reading">
        <div className="text-center mb-16">
          <SectionTitle>Further reading</SectionTitle>
          <SectionSubtitle>The thinking behind the wiki.</SectionSubtitle>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FURTHER_READING.map((r) => (
            <Card
              key={r.title}
              variant="interactive"
              className="flex flex-col gap-4"
              badge={
                <span className="flex items-center gap-1 text-[11px] font-mono text-[var(--color-fg-tertiary)]">
                  {r.badge === 'external' ? (
                    <>
                      <ExternalLink size={11} strokeWidth={1.5} />
                      external
                    </>
                  ) : (
                    'internal'
                  )}
                </span>
              }
            >
              <h3 className="text-title-md text-[var(--color-fg)] pr-16">{r.title}</h3>
              <p className="text-body-sm text-[var(--color-fg-muted)] leading-relaxed flex-1">
                {r.body}
              </p>
              <a
                href={r.href}
                className="
                  inline-flex items-center gap-1.5 text-[13px]
                  text-[var(--color-fg-tertiary)] no-underline
                  hover:text-[var(--color-fg-muted)] transition-colors
                  mt-auto
                "
              >
                read
                <ArrowRight size={12} strokeWidth={1.5} />
              </a>
            </Card>
          ))}
        </div>
      </Section>
    </PublicLayout>
  );
}
