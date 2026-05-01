import { createFileRoute, Link } from '@tanstack/react-router';
import { Rss, Github, Linkedin } from 'lucide-react';
import { PublicLayout } from '@/app/layouts/PublicLayout';
import { TocSidebar } from '@/components/ui/TocSidebar';

export const Route = createFileRoute('/g/$workspace/')({
  component: GardenIndex,
  loader: async () => ({}),
});

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

type Maturity = 'evergreen' | 'budding' | 'seedling';

interface FeaturedNote {
  slug: string;
  title: string;
  excerpt: string;
  readTime: number;
  maturity: Maturity;
  topic: string;
  gradient: string;
}

interface LatestNote {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  maturity: Maturity;
  topic: string;
}

interface TopicRow {
  path: string;
  count: number;
}

interface TagItem {
  label: string;
  count: number;
}

const featured: FeaturedNote[] = [
  {
    slug: 'why-ddd-is-harder',
    title: 'Why DDD is harder than it looks',
    excerpt:
      'Domains are not folders. After 3 years of bouncing between Laravel anemic models and forced aggregates, here is what actually compounds.',
    readTime: 12,
    maturity: 'evergreen',
    topic: 'engineering / software',
    gradient: 'linear-gradient(135deg,#2a2a2a 0%,#0a0a0a 100%)',
  },
  {
    slug: 'stoicism-for-engineers',
    title: 'Stoicism for software engineers',
    excerpt:
      'Marcus Aurelius did not have stand-ups. But he did have agency, observability, and a tight feedback loop with reality.',
    readTime: 8,
    maturity: 'evergreen',
    topic: 'philosophy / stoicism',
    gradient: 'linear-gradient(135deg,#262e38 0%,#0a0a0a 100%)',
  },
  {
    slug: 'cost-of-meta-work',
    title: 'The cost of meta-work in PKM',
    excerpt:
      'Tagging the system that tags the system. When does the second brain become a tax?',
    readTime: 6,
    maturity: 'budding',
    topic: 'productivity / pkm',
    gradient: 'linear-gradient(135deg,#1a2129 0%,#0a0a0a 100%)',
  },
];

const latest: LatestNote[] = [
  {
    slug: 'laravel-queue-gotchas',
    title: 'Laravel queue gotchas in high-throughput jobs',
    excerpt: 'Memory leaks, timeout traps, and the one config option nobody reads.',
    date: 'Apr 28, 2026',
    readTime: 7,
    maturity: 'budding',
    topic: 'engineering',
  },
  {
    slug: 'obsidian-graph-is-a-lie',
    title: 'The Obsidian graph is a beautiful lie',
    excerpt: 'Visual complexity without epistemic structure. Notes that point everywhere go nowhere.',
    date: 'Apr 22, 2026',
    readTime: 5,
    maturity: 'evergreen',
    topic: 'productivity',
  },
  {
    slug: 'react-server-components-mental-model',
    title: 'A mental model for React Server Components',
    excerpt: 'Not a fetch replacement. Not a backend. A rendering boundary that lives on the server.',
    date: 'Apr 18, 2026',
    readTime: 9,
    maturity: 'seedling',
    topic: 'engineering / frontend',
  },
  {
    slug: 'vibe-coding-vs-engineering',
    title: 'Vibe coding vs. engineering discipline',
    excerpt: 'Speed is not the enemy of quality. Thoughtlessness is.',
    date: 'Apr 12, 2026',
    readTime: 4,
    maturity: 'budding',
    topic: 'craft',
  },
  {
    slug: 'designing-for-trust',
    title: 'Designing interfaces for institutional trust',
    excerpt: 'In enterprise software, every misplaced label is a liability question.',
    date: 'Apr 05, 2026',
    readTime: 6,
    maturity: 'budding',
    topic: 'design',
  },
  {
    slug: 'the-dao-of-configuration',
    title: 'The Dao of configuration files',
    excerpt: 'Twelve YAML keys versus a programmatic API. The tradeoff nobody admits.',
    date: 'Mar 29, 2026',
    readTime: 5,
    maturity: 'evergreen',
    topic: 'engineering',
  },
  {
    slug: 'ai-native-workflow-2026',
    title: 'My AI-native workflow in 2026',
    excerpt: 'Not prompts. Patterns. How I think about agent-assisted development day to day.',
    date: 'Mar 21, 2026',
    readTime: 11,
    maturity: 'evergreen',
    topic: 'productivity / ai',
  },
  {
    slug: 'postgres-indexing-for-mortals',
    title: 'PostgreSQL indexing for mortals',
    excerpt: 'You do not need a DBA. You need a covering index and ten minutes of EXPLAIN ANALYZE.',
    date: 'Mar 14, 2026',
    readTime: 8,
    maturity: 'evergreen',
    topic: 'engineering / database',
  },
  {
    slug: 'learning-in-public-costs',
    title: 'The hidden costs of learning in public',
    excerpt: 'Performing growth is not the same as growing.',
    date: 'Mar 07, 2026',
    readTime: 4,
    maturity: 'budding',
    topic: 'meta',
  },
  {
    slug: 'typescript-variance',
    title: 'TypeScript variance is not a bug',
    excerpt: 'Covariance, contravariance, and why your generic is lying to you.',
    date: 'Feb 28, 2026',
    readTime: 10,
    maturity: 'evergreen',
    topic: 'engineering / typescript',
  },
  {
    slug: 'shipping-is-the-test',
    title: 'Shipping is the test',
    excerpt: 'The only integration test that matters is production with real users.',
    date: 'Feb 21, 2026',
    readTime: 3,
    maturity: 'evergreen',
    topic: 'craft',
  },
  {
    slug: 'docker-networking-mental-model',
    title: 'A reliable mental model for Docker networking',
    excerpt: 'Bridge, host, overlay — and why containers keep refusing to talk to each other.',
    date: 'Feb 14, 2026',
    readTime: 7,
    maturity: 'evergreen',
    topic: 'engineering / infra',
  },
];

const topics: TopicRow[] = [
  { path: 'Engineering / Software', count: 42 },
  { path: 'Engineering / Frontend', count: 28 },
  { path: 'Engineering / Infra', count: 19 },
  { path: 'Engineering / Database', count: 14 },
  { path: 'Engineering / TypeScript', count: 11 },
  { path: 'Philosophy / Stoicism', count: 9 },
  { path: 'Productivity / PKM', count: 17 },
  { path: 'Productivity / AI', count: 13 },
  { path: 'Design', count: 8 },
  { path: 'Craft', count: 15 },
  { path: 'Meta', count: 6 },
  { path: 'Reading Notes', count: 22 },
];

const tags: TagItem[] = [
  { label: 'laravel', count: 18 },
  { label: 'react', count: 14 },
  { label: 'typescript', count: 12 },
  { label: 'docker', count: 11 },
  { label: 'ddd', count: 8 },
  { label: 'stoicism', count: 7 },
  { label: 'obsidian', count: 9 },
  { label: 'pkm', count: 10 },
  { label: 'ai', count: 13 },
  { label: 'postgres', count: 6 },
  { label: 'nginx', count: 5 },
  { label: 'tailwind', count: 7 },
  { label: 'tanstack', count: 4 },
  { label: 'api-design', count: 8 },
  { label: 'queues', count: 5 },
  { label: 'mental-models', count: 11 },
  { label: 'craft', count: 9 },
  { label: 'async', count: 6 },
  { label: 'monolith', count: 4 },
  { label: 'microservices', count: 3 },
  { label: 'redis', count: 5 },
  { label: 'vite', count: 4 },
  { label: 'git', count: 6 },
  { label: 'linux', count: 7 },
];

// ---------------------------------------------------------------------------
// TOC config
// ---------------------------------------------------------------------------

const TOC_ITEMS = [
  { id: 'featured', label: 'Featured' },
  { id: 'latest', label: 'Latest' },
  { id: 'topics', label: 'Topics' },
  { id: 'tags', label: 'Tags' },
  { id: 'about', label: 'About' },
  { id: 'subscribe', label: 'Subscribe' },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const MATURITY_LABEL: Record<Maturity, string> = {
  evergreen: 'EVERGREEN',
  budding: 'BUDDING',
  seedling: 'SEEDLING',
};

const MATURITY_COLOR: Record<Maturity, string> = {
  evergreen: '#22c55e',
  budding: '#6b6b6b',
  seedling: '#f59e0b',
};

interface MaturityPillProps {
  maturity: Maturity;
}

function MaturityPill({ maturity }: MaturityPillProps) {
  return (
    <span
      className="inline-block text-[11px] font-mono tracking-[0.08em] uppercase px-2 py-0.5 leading-none"
      style={{
        color: MATURITY_COLOR[maturity],
        border: `1px solid ${MATURITY_COLOR[maturity]}`,
      }}
    >
      {MATURITY_LABEL[maturity]}
    </span>
  );
}

interface FeaturedCardProps {
  note: FeaturedNote;
  workspace: string;
}

function FeaturedCard({ note, workspace }: FeaturedCardProps) {
  return (
    <Link
      to="/g/$workspace/$slug"
      params={{ workspace, slug: note.slug }}
      className="flex flex-col no-underline group"
      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Cover gradient */}
      <div
        className="h-[120px] w-full"
        style={{ background: note.gradient }}
        aria-hidden="true"
      />
      {/* Body */}
      <div className="flex flex-col flex-1 p-6" style={{ background: '#0f0f10' }}>
        <p
          className="text-[11px] font-mono uppercase tracking-[0.08em] mb-3"
          style={{ color: '#a0a0a0' }}
        >
          {note.topic}
        </p>
        <h3
          className="font-bold leading-snug mb-3 group-hover:text-white transition-colors"
          style={{ fontSize: '1.125rem', color: '#e5e5e5' }}
        >
          {note.title}
        </h3>
        <p
          className="font-light leading-relaxed flex-1 mb-4"
          style={{ fontSize: '0.875rem', color: '#b8b8b8' }}
        >
          {note.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <MaturityPill maturity={note.maturity} />
          <span
            className="text-[11px] font-mono uppercase tracking-[0.08em]"
            style={{ color: '#a0a0a0' }}
          >
            {note.readTime} min read
          </span>
        </div>
      </div>
    </Link>
  );
}

interface LatestCardProps {
  note: LatestNote;
  workspace: string;
}

function LatestCard({ note, workspace }: LatestCardProps) {
  return (
    <Link
      to="/g/$workspace/$slug"
      params={{ workspace, slug: note.slug }}
      className="flex flex-col no-underline group p-5"
      style={{
        background: '#0f0f10',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <p
        className="text-[11px] font-mono uppercase tracking-[0.08em] mb-2"
        style={{ color: '#a0a0a0' }}
      >
        {note.topic}
      </p>
      <h3
        className="font-bold leading-snug mb-2 group-hover:text-white transition-colors"
        style={{ fontSize: '1rem', color: '#e5e5e5' }}
      >
        {note.title}
      </h3>
      <p
        className="font-light leading-snug flex-1 mb-3 line-clamp-2"
        style={{ fontSize: '0.8125rem', color: '#b8b8b8' }}
      >
        {note.excerpt}
      </p>
      <div className="flex items-center justify-between">
        <span
          className="text-[11px] font-mono uppercase tracking-[0.08em]"
          style={{ color: '#a0a0a0' }}
        >
          {note.date} &middot; {note.readTime} min
        </span>
        <MaturityPill maturity={note.maturity} />
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

function GardenIndex() {
  const { workspace } = Route.useParams();

  return (
    <PublicLayout>
      {/* Outer dark shell — full page override */}
      <div style={{ background: '#0a0a0a', color: '#e5e5e5' }}>

        {/* ── HERO BAND ── */}
        <section
          style={{
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '80px',
            paddingBottom: '80px',
          }}
        >
          <div className="mx-auto w-full max-w-[1440px] px-6">
            <div className="flex gap-12">
              {/* Main content */}
              <div className="flex-1 min-w-0">
                {/* Meta row */}
                <p
                  className="font-mono uppercase tracking-[1.5px] mb-4"
                  style={{ fontSize: '0.8125rem', color: '#a0a0a0' }}
                >
                  PUBLIC GARDEN &nbsp;&middot;&nbsp;{' '}
                  <span style={{ color: '#b8b8b8' }}>@{workspace}</span>
                </p>

                {/* h1 */}
                <h1
                  className="font-bold leading-[1.05] mb-5"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#ffffff' }}
                >
                  Vincenzo&rsquo;s notebook.
                </h1>

                {/* Subhead */}
                <p
                  className="font-light leading-relaxed mb-10 max-w-[640px]"
                  style={{ fontSize: '1.125rem', color: '#b8b8b8' }}
                >
                  120 notes, 18 articles, 45 bookmarks. Shipped over 3 years.
                </p>

                {/* CTA pills */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#latest"
                    className="inline-flex items-center gap-1.5 no-underline font-bold tracking-[0.5px] transition-colors"
                    style={{
                      fontSize: '0.875rem',
                      background: '#ffffff',
                      color: '#0a0a0a',
                      padding: '12px 24px',
                      borderRadius: '9999px',
                    }}
                  >
                    Latest &rarr;
                  </a>
                  <a
                    href="#topics"
                    className="inline-flex items-center no-underline font-bold tracking-[0.5px] transition-colors"
                    style={{
                      fontSize: '0.875rem',
                      border: '1px solid rgba(255,255,255,0.20)',
                      color: '#e5e5e5',
                      padding: '12px 24px',
                      borderRadius: '9999px',
                    }}
                  >
                    Topics
                  </a>
                  <a
                    href="#featured"
                    className="inline-flex items-center no-underline font-bold tracking-[0.5px] transition-colors"
                    style={{
                      fontSize: '0.875rem',
                      border: '1px solid rgba(255,255,255,0.20)',
                      color: '#e5e5e5',
                      padding: '12px 24px',
                      borderRadius: '9999px',
                    }}
                  >
                    Articles
                  </a>
                </div>
              </div>

              {/* ToC sidebar */}
              <div className="hidden lg:block w-[180px] shrink-0 pt-1">
                <TocSidebar items={TOC_ITEMS} />
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURED STRIP ── */}
        <section
          id="featured"
          style={{
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '80px',
            paddingBottom: '80px',
          }}
        >
          <div className="mx-auto w-full max-w-[1440px] px-6">
            <p
              className="font-mono uppercase tracking-[1.5px] mb-2"
              style={{ fontSize: '0.8125rem', color: '#a0a0a0' }}
            >
              FEATURED &nbsp;&middot;&nbsp; EVERGREEN
            </p>
            <h2
              className="font-bold mb-10"
              style={{ fontSize: '2rem', color: '#ffffff' }}
            >
              Worth the time.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              {featured.map((note) => (
                <FeaturedCard key={note.slug} note={note} workspace={workspace} />
              ))}
            </div>
          </div>
        </section>

        {/* ── LATEST ── */}
        <section
          id="latest"
          style={{
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '80px',
            paddingBottom: '80px',
          }}
        >
          <div className="mx-auto w-full max-w-[1440px] px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p
                  className="font-mono uppercase tracking-[1.5px] mb-2"
                  style={{ fontSize: '0.8125rem', color: '#a0a0a0' }}
                >
                  RECENT WRITING
                </p>
                <h2
                  className="font-bold"
                  style={{ fontSize: '2rem', color: '#ffffff' }}
                >
                  Latest 12
                </h2>
              </div>
              <Link
                to="/g/$workspace/"
                params={{ workspace }}
                className="no-underline font-mono uppercase tracking-[1.5px] transition-colors"
                style={{ fontSize: '0.8125rem', color: '#a0a0a0' }}
              >
                VIEW ALL &rsaquo;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              {latest.map((note) => (
                <LatestCard key={note.slug} note={note} workspace={workspace} />
              ))}
            </div>
          </div>
        </section>

        {/* ── TOPICS TREE ── */}
        <section
          id="topics"
          style={{
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '80px',
            paddingBottom: '80px',
          }}
        >
          <div className="mx-auto w-full max-w-[1440px] px-6">
            <p
              className="font-mono uppercase tracking-[1.5px] mb-2"
              style={{ fontSize: '0.8125rem', color: '#a0a0a0' }}
            >
              BY TOPIC
            </p>
            <h2
              className="font-bold mb-10"
              style={{ fontSize: '2rem', color: '#ffffff' }}
            >
              Topics
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: topic rows */}
              <div style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                {topics.map((t, i) => (
                  <div
                    key={t.path}
                    className="flex items-center justify-between px-5 py-3"
                    style={{
                      borderBottom:
                        i < topics.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    }}
                  >
                    <span
                      className="font-mono"
                      style={{ fontSize: '0.875rem', color: '#a3a3a3' }}
                    >
                      {t.path}
                    </span>
                    <span
                      className="font-mono tabular-nums"
                      style={{ fontSize: '0.875rem', color: '#a0a0a0' }}
                    >
                      {t.count}
                    </span>
                  </div>
                ))}
              </div>

              {/* Right: preview of first topic contents */}
              <div
                className="p-6"
                style={{
                  background: '#0f0f10',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <p
                  className="font-mono uppercase tracking-[1.5px] mb-4"
                  style={{ fontSize: '0.8125rem', color: '#a0a0a0' }}
                >
                  Engineering / Software &middot; 42 notes
                </p>
                <ul className="space-y-3 list-none p-0 m-0">
                  {latest
                    .filter((n) => n.topic.toLowerCase().startsWith('engineering'))
                    .slice(0, 5)
                    .map((n) => (
                      <li key={n.slug}
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px' }}
                      >
                        <Link
                          to="/g/$workspace/$slug"
                          params={{ workspace, slug: n.slug }}
                          className="no-underline block group"
                        >
                          <span
                            className="font-bold leading-snug group-hover:text-white transition-colors"
                            style={{ fontSize: '0.9375rem', color: '#e5e5e5' }}
                          >
                            {n.title}
                          </span>
                          <span
                            className="block font-mono mt-1"
                            style={{ fontSize: '0.75rem', color: '#a0a0a0' }}
                          >
                            {n.date} &middot; {n.readTime} min
                          </span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── TAGS CLOUD ── */}
        <section
          id="tags"
          style={{
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '80px',
            paddingBottom: '80px',
          }}
        >
          <div className="mx-auto w-full max-w-[1440px] px-6">
            <p
              className="font-mono uppercase tracking-[1.5px] mb-2"
              style={{ fontSize: '0.8125rem', color: '#a0a0a0' }}
            >
              TAGS
            </p>
            <h2
              className="font-bold mb-10"
              style={{ fontSize: '2rem', color: '#ffffff' }}
            >
              All tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t.label}
                  className="inline-flex items-baseline gap-1 font-mono"
                  style={{
                    fontSize: '0.875rem',
                    color: '#a3a3a3',
                    border: '1px solid rgba(255,255,255,0.10)',
                    padding: '6px 12px',
                    cursor: 'default',
                  }}
                >
                  {t.label}
                  <span style={{ fontSize: '0.75rem', color: '#a0a0a0' }}>&middot; {t.count}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section
          id="about"
          style={{
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '80px',
            paddingBottom: '80px',
          }}
        >
          <div className="mx-auto w-full max-w-[1440px] px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left: copy */}
              <div>
                <p
                  className="font-mono uppercase tracking-[1.5px] mb-2"
                  style={{ fontSize: '0.8125rem', color: '#a0a0a0' }}
                >
                  ABOUT THIS GARDEN
                </p>
                <h2
                  className="font-bold mb-6"
                  style={{ fontSize: '2rem', color: '#ffffff' }}
                >
                  About this garden
                </h2>
                <p
                  className="font-light leading-relaxed mb-4 max-w-prose"
                  style={{ fontSize: '1rem', color: '#a3a3a3' }}
                >
                  A public record of how I think. Not a blog, not a portfolio — a living archive of
                  notes, essays, and fragments written while building software at Sagres. Engineered
                  over three years, updated in public.
                </p>
                <p
                  className="font-light leading-relaxed mb-8 max-w-prose"
                  style={{ fontSize: '1rem', color: '#a3a3a3' }}
                >
                  The maturity system (seedling, budding, evergreen) reflects how settled an idea
                  is. Seedlings are drafts. Evergreen notes have survived multiple revisions and
                  stand on their own.
                </p>
                <a
                  href={`/g/${workspace}/colophon`}
                  className="no-underline font-mono uppercase tracking-[1.5px] transition-colors hover:text-white"
                  style={{ fontSize: '0.8125rem', color: '#a0a0a0' }}
                >
                  READ FULL COLOPHON &rsaquo;
                </a>
              </div>

              {/* Right: 2x2 stat grid */}
              <div
                className="grid grid-cols-2 gap-px self-start"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                {[
                  { value: '120', label: 'NOTES' },
                  { value: '18', label: 'ARTICLES' },
                  { value: 'Mar 2023', label: 'OLDEST NOTE' },
                  { value: 'Apr 2026', label: 'LAST UPDATE' },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex flex-col p-6"
                    style={{ background: '#0f0f10' }}
                  >
                    <span
                      className="font-bold leading-none mb-2"
                      style={{ fontSize: '1.75rem', color: '#ffffff' }}
                    >
                      {s.value}
                    </span>
                    <span
                      className="font-mono uppercase tracking-[1.5px]"
                      style={{ fontSize: '0.75rem', color: '#a0a0a0' }}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SUBSCRIBE / CONNECT ── */}
        <section
          id="subscribe"
          style={{
            paddingTop: '80px',
            paddingBottom: '80px',
          }}
        >
          <div className="mx-auto w-full max-w-[1440px] px-6 flex flex-col items-center">
            <div
              className="w-full max-w-[560px] p-12 flex flex-col items-center text-center"
              style={{ border: '1px solid rgba(255,255,255,0.10)' }}
            >
              <h2
                className="font-bold mb-2"
                style={{ fontSize: '1.5rem', color: '#ffffff' }}
              >
                Read along.
              </h2>
              <p
                className="font-light mb-8"
                style={{ fontSize: '0.9375rem', color: '#b8b8b8' }}
              >
                New notes and essays, without the noise.
              </p>

              {/* Email form — mock, no submission */}
              <form
                className="flex w-full gap-0 mb-8"
                onSubmit={(e) => e.preventDefault()}
                aria-label="Subscribe to garden updates"
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 font-light outline-none"
                  style={{
                    background: '#1a1a1a',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRight: 'none',
                    color: '#e5e5e5',
                    padding: '12px 16px',
                    fontSize: '0.875rem',
                  }}
                />
                <button
                  type="submit"
                  className="font-bold tracking-[0.5px] shrink-0 transition-colors"
                  style={{
                    background: '#ffffff',
                    color: '#0a0a0a',
                    border: 'none',
                    padding: '12px 24px',
                    fontSize: '0.875rem',
                    borderRadius: '0 9999px 9999px 0',
                    cursor: 'pointer',
                  }}
                >
                  Subscribe
                </button>
              </form>

              {/* Social links */}
              <div className="flex items-center gap-6">
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 no-underline transition-colors hover:text-white"
                  style={{ fontSize: '0.8125rem', color: '#a0a0a0' }}
                  aria-label="RSS feed"
                >
                  <Rss size={14} strokeWidth={1.5} />
                  RSS
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 no-underline transition-colors hover:text-white"
                  style={{ fontSize: '0.8125rem', color: '#a0a0a0' }}
                  aria-label="GitHub profile"
                >
                  <Github size={14} strokeWidth={1.5} />
                  GitHub
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 no-underline transition-colors hover:text-white"
                  style={{ fontSize: '0.8125rem', color: '#a0a0a0' }}
                  aria-label="LinkedIn profile"
                >
                  <Linkedin size={14} strokeWidth={1.5} />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </PublicLayout>
  );
}
