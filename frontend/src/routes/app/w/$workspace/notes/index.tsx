import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Search, LayoutGrid, List, Table2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/app/w/$workspace/notes/')({
  component: NotesList,
});

// ── Mock data ─────────────────────────────────────────────────

type NoteType = 'NOTE' | 'ARTICLE' | 'BOOKMARK' | 'COLLECTION';
type Maturity = 'seedling' | 'budding' | 'evergreen';
type Visibility = 'public' | 'unlisted' | 'private';
type ViewMode = 'GRID' | 'LIST' | 'TABLE';
type SortMode = 'NEWEST' | 'OLDEST' | 'A-Z' | 'MOST LINKED';
type TypeFilter = 'ALL' | NoteType;

interface MockNote {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  type: NoteType;
  maturity: Maturity;
  visibility: Visibility;
  topic: string;
  tags: string[];
  readMin: number;
  backlinks: number;
  updatedAgo: string;
}

const MOCK_NOTES: MockNote[] = [
  { id: 1,  slug: 'why-ddd-is-harder',           title: 'Why DDD is harder than it looks',                  excerpt: 'Domain-driven design promises alignment between code and business reality, but the aggregates always lie.',       type: 'ARTICLE',    maturity: 'evergreen', visibility: 'public',   topic: 'Engineering',   tags: ['ddd','architecture'],        readMin: 12, backlinks: 8,  updatedAgo: '2h ago' },
  { id: 2,  slug: 'react-18-transitions',         title: 'React 18 transitions and deferred rendering',      excerpt: 'useTransition lets you mark updates as non-urgent, preventing the UI from blocking on slow state changes.',    type: 'NOTE',       maturity: 'budding',   visibility: 'unlisted', topic: 'Engineering',   tags: ['react','performance'],       readMin: 6,  backlinks: 3,  updatedAgo: '1d ago' },
  { id: 3,  slug: 'how-i-read-papers',            title: 'How I read research papers fast',                  excerpt: 'A three-pass technique borrowed from academia: skim abstract, read intro/conclusion, dive into methods.',     type: 'NOTE',       maturity: 'evergreen', visibility: 'public',   topic: 'Learning',      tags: ['reading','research'],        readMin: 4,  backlinks: 12, updatedAgo: '3d ago' },
  { id: 4,  slug: 'bounded-contexts-map',         title: 'Bounded contexts map — Pinakes',                   excerpt: 'Context map showing relationships between Auth, Workspace, Content, and Search bounded contexts.',           type: 'COLLECTION', maturity: 'seedling',  visibility: 'private',  topic: 'Engineering',   tags: ['ddd','pinakes'],             readMin: 3,  backlinks: 0,  updatedAgo: '5d ago' },
  { id: 5,  slug: 'stoic-quotes-collection',      title: 'Stoic quotes I return to',                         excerpt: 'A living collection of Marcus Aurelius, Epictetus, and Seneca passages that keep me calibrated.',            type: 'COLLECTION', maturity: 'evergreen', visibility: 'public',   topic: 'Philosophy',    tags: ['stoicism','quotes'],         readMin: 8,  backlinks: 5,  updatedAgo: '1w ago' },
  { id: 6,  slug: 'event-sourcing-tradeoffs',     title: 'Event sourcing: the hidden tradeoffs',             excerpt: 'Eventual consistency is not free. Projections drift, schemas evolve, and replays get expensive at scale.',    type: 'ARTICLE',    maturity: 'budding',   visibility: 'public',   topic: 'Engineering',   tags: ['event-sourcing','backend'],  readMin: 14, backlinks: 6,  updatedAgo: '2w ago' },
  { id: 7,  slug: 'good-bookmarks',               title: 'Good reads — Q1 2026',                             excerpt: 'Curated links on distributed systems, typography, and cognitive load theory collected this quarter.',         type: 'BOOKMARK',   maturity: 'seedling',  visibility: 'unlisted', topic: 'Curation',      tags: ['links','q1-2026'],           readMin: 2,  backlinks: 0,  updatedAgo: '2w ago' },
  { id: 8,  slug: 'zettelkasten-workflow',         title: 'My Zettelkasten workflow in 2026',                 excerpt: 'Atomic notes, permanent notes, and literature notes — how I actually use the slip-box principle today.',      type: 'ARTICLE',    maturity: 'evergreen', visibility: 'public',   topic: 'Learning',      tags: ['zettelkasten','pkm'],        readMin: 9,  backlinks: 11, updatedAgo: '3w ago' },
  { id: 9,  slug: 'postgres-indexing-notes',      title: 'PostgreSQL indexing notes',                        excerpt: 'Partial indexes, covering indexes, and the BRIN surprise. Notes from tuning a 50M row table.',               type: 'NOTE',       maturity: 'budding',   visibility: 'private',  topic: 'Engineering',   tags: ['postgres','database'],       readMin: 7,  backlinks: 2,  updatedAgo: '1mo ago' },
  { id: 10, slug: 'deep-work-sessions',           title: 'Deep work session patterns',                       excerpt: 'Cal Newport\'s protocol adapted for async distributed teams. Fixed schedules beat flexible ones.',            type: 'NOTE',       maturity: 'evergreen', visibility: 'public',   topic: 'Productivity',  tags: ['deep-work','focus'],         readMin: 5,  backlinks: 4,  updatedAgo: '1mo ago' },
  { id: 11, slug: 'typescript-satisfies',         title: 'TypeScript satisfies: when and why',               excerpt: 'The satisfies operator gives you type narrowing without losing the literal type. A practical walkthrough.',    type: 'ARTICLE',    maturity: 'budding',   visibility: 'public',   topic: 'Engineering',   tags: ['typescript'],                readMin: 6,  backlinks: 1,  updatedAgo: '1mo ago' },
  { id: 12, slug: 'team-topology-patterns',       title: 'Team topology patterns I\'ve seen work',           excerpt: 'Stream-aligned teams decouple well only when platform teams are not bottlenecks. The real constraint is API.',  type: 'NOTE',       maturity: 'seedling',  visibility: 'unlisted', topic: 'Leadership',    tags: ['teams','org-design'],        readMin: 8,  backlinks: 0,  updatedAgo: '6w ago' },
  { id: 13, slug: 'css-cascade-layers',           title: 'CSS cascade layers are underrated',                excerpt: 'Layer ordering solves specificity wars for good. Migration from BEM utilities to layers in practice.',          type: 'NOTE',       maturity: 'budding',   visibility: 'public',   topic: 'Engineering',   tags: ['css','frontend'],            readMin: 5,  backlinks: 3,  updatedAgo: '6w ago' },
  { id: 14, slug: 'second-brain-principles',      title: 'Second brain — core principles',                   excerpt: 'CODE: Capture, Organise, Distil, Express. The four steps that make knowledge actionable rather than hoarded.', type: 'COLLECTION', maturity: 'evergreen', visibility: 'public',   topic: 'Learning',      tags: ['pkm','second-brain'],        readMin: 11, backlinks: 14, updatedAgo: '2mo ago' },
  { id: 15, slug: 'saas-pricing-mistakes',        title: 'SaaS pricing mistakes I\'ve watched',              excerpt: 'Value-based pricing is the goal but everyone ships cost-plus first. Why, and what to do about it.',             type: 'ARTICLE',    maturity: 'budding',   visibility: 'public',   topic: 'Business',      tags: ['saas','pricing'],            readMin: 10, backlinks: 2,  updatedAgo: '2mo ago' },
  { id: 16, slug: 'docker-networking-notes',      title: 'Docker networking mental model',                   excerpt: 'Bridge, host, overlay — the three modes and when each one hurts you. Includes the hairpin NAT gotcha.',         type: 'NOTE',       maturity: 'seedling',  visibility: 'private',  topic: 'Infrastructure', tags: ['docker','networking'],       readMin: 4,  backlinks: 0,  updatedAgo: '2mo ago' },
  { id: 17, slug: 'on-taste',                     title: 'On taste and the gap',                             excerpt: 'Ira Glass\'s gap between taste and ability is real, but the path through it is output volume, not patience.',  type: 'NOTE',       maturity: 'evergreen', visibility: 'public',   topic: 'Craft',         tags: ['taste','creativity'],        readMin: 3,  backlinks: 7,  updatedAgo: '3mo ago' },
  { id: 18, slug: 'laravel-horizon-tips',         title: 'Laravel Horizon: production tips',                 excerpt: 'Supervisor balancing, memory limits, and the job retry backoff that saves you at 2 am on a pager.',            type: 'NOTE',       maturity: 'budding',   visibility: 'private',  topic: 'Engineering',   tags: ['laravel','queues'],          readMin: 6,  backlinks: 1,  updatedAgo: '3mo ago' },
  { id: 19, slug: 'weekly-review-template',       title: 'Weekly review template',                           excerpt: 'A 15-minute end-of-week process: inboxes to zero, open loops closed, next week seeded.',                      type: 'COLLECTION', maturity: 'evergreen', visibility: 'unlisted', topic: 'Productivity',  tags: ['review','weekly'],           readMin: 2,  backlinks: 5,  updatedAgo: '3mo ago' },
  { id: 20, slug: 'emergence-complexity',         title: 'Emergence and complexity in systems',              excerpt: 'Why rule-based simple agents produce complex behaviour, and what that means for software architecture.',          type: 'ARTICLE',    maturity: 'seedling',  visibility: 'public',   topic: 'Philosophy',    tags: ['complexity','systems'],      readMin: 13, backlinks: 0,  updatedAgo: '4mo ago' },
  { id: 21, slug: 'writing-to-think',             title: 'Writing to think',                                 excerpt: 'Writing is not recording thought — it is the medium through which thought becomes precise and falsifiable.',    type: 'NOTE',       maturity: 'evergreen', visibility: 'public',   topic: 'Craft',         tags: ['writing'],                   readMin: 4,  backlinks: 9,  updatedAgo: '4mo ago' },
  { id: 22, slug: 'redis-data-structures',        title: 'Redis data structures field notes',                excerpt: 'Sorted sets for leaderboards, streams for event log, and the one time HyperLogLog saved the day.',             type: 'NOTE',       maturity: 'budding',   visibility: 'private',  topic: 'Engineering',   tags: ['redis','backend'],           readMin: 5,  backlinks: 0,  updatedAgo: '5mo ago' },
  { id: 23, slug: 'principles-collection',        title: 'Personal operating principles',                    excerpt: 'A working list of heuristics I apply to decisions: reversible > irreversible, slow > fast under uncertainty.',  type: 'COLLECTION', maturity: 'evergreen', visibility: 'unlisted', topic: 'Philosophy',    tags: ['principles','decisions'],    readMin: 7,  backlinks: 6,  updatedAgo: '5mo ago' },
  { id: 24, slug: 'ab-testing-pitfalls',          title: 'A/B testing pitfalls no one warns about',          excerpt: 'Peeking at results, novelty effects, and the SRM that invalidated six months of experiments.',                  type: 'ARTICLE',    maturity: 'budding',   visibility: 'public',   topic: 'Business',      tags: ['ab-testing','stats'],        readMin: 11, backlinks: 3,  updatedAgo: '6mo ago' },
];

const TOPICS = [
  { name: 'Engineering',    count: 9 },
  { name: 'Learning',       count: 3 },
  { name: 'Philosophy',     count: 3 },
  { name: 'Productivity',   count: 2 },
  { name: 'Craft',          count: 2 },
  { name: 'Business',       count: 2 },
  { name: 'Leadership',     count: 1 },
  { name: 'Infrastructure', count: 1 },
  { name: 'Curation',       count: 1 },
];

const TOP_TAGS = [
  'ddd', 'react', 'typescript', 'pkm', 'stoicism', 'architecture',
  'backend', 'frontend', 'writing', 'second-brain', 'deep-work', 'laravel',
];

const TYPE_FILTERS: TypeFilter[] = ['ALL', 'NOTE', 'ARTICLE', 'BOOKMARK', 'COLLECTION'];
const SORT_MODES: SortMode[] = ['NEWEST', 'OLDEST', 'A-Z', 'MOST LINKED'];
const MATURITY_OPTS: Array<{ value: Maturity | 'all'; label: string }> = [
  { value: 'all',       label: 'All maturity' },
  { value: 'seedling',  label: 'Seedling' },
  { value: 'budding',   label: 'Budding' },
  { value: 'evergreen', label: 'Evergreen' },
];
const VISIBILITY_OPTS: Array<{ value: Visibility | 'all'; label: string }> = [
  { value: 'all',      label: 'All visibility' },
  { value: 'public',   label: 'Public' },
  { value: 'unlisted', label: 'Unlisted' },
  { value: 'private',  label: 'Private' },
];

// ── Helpers ───────────────────────────────────────────────────

const MATURITY_COLOR: Record<Maturity, string> = {
  seedling:  'text-[var(--color-maturity-seedling)]',
  budding:   'text-[var(--color-maturity-budding)]',
  evergreen: 'text-[var(--color-maturity-evergreen)]',
};

// ── Sub-components ────────────────────────────────────────────

interface FacetChipProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  count?: number;
}

function FacetChip({ active, onClick, children, count }: FacetChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-chip)] text-[11px] font-mono uppercase tracking-[0.07em] leading-none border transition-colors duration-[150ms] cursor-pointer select-none whitespace-nowrap',
        active
          ? 'bg-[var(--color-fg)] text-[var(--color-canvas)] border-[var(--color-fg)]'
          : 'bg-[var(--color-surface-2)] text-[var(--color-fg-muted)] border-[var(--color-border-hairline)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)]'
      )}
    >
      {children}
      {count !== undefined && (
        <span className={cn('text-[10px]', active ? 'opacity-70' : 'opacity-50')}>{count}</span>
      )}
    </button>
  );
}

interface ViewToggleProps {
  value: ViewMode;
  onChange: (v: ViewMode) => void;
}

function ViewToggle({ value, onChange }: ViewToggleProps) {
  const opts: Array<{ mode: ViewMode; Icon: typeof LayoutGrid }> = [
    { mode: 'GRID',  Icon: LayoutGrid },
    { mode: 'LIST',  Icon: List },
    { mode: 'TABLE', Icon: Table2 },
  ];
  return (
    <div className="flex items-center gap-1">
      {opts.map(({ mode, Icon }) => (
        <button
          key={mode}
          type="button"
          onClick={() => onChange(mode)}
          aria-label={mode}
          className={cn(
            'inline-flex items-center justify-center w-8 h-8 rounded-[var(--radius-sm)] border transition-colors duration-[150ms]',
            value === mode
              ? 'bg-[var(--color-surface-3)] border-[var(--color-border-strong)] text-[var(--color-fg)]'
              : 'bg-transparent border-transparent text-[var(--color-fg-tertiary)] hover:text-[var(--color-fg-muted)]'
          )}
        >
          <Icon size={14} strokeWidth={1.5} />
        </button>
      ))}
    </div>
  );
}

interface NoteCardProps {
  note: MockNote;
  workspace: string;
}

function NoteCardGrid({ note, workspace }: NoteCardProps) {
  return (
    <Link
      to="/app/w/$workspace/notes/$slug"
      params={{ workspace, slug: note.slug }}
      className={cn(
        'group flex flex-col gap-4 p-6 rounded-[var(--radius-card)] border',
        'bg-[var(--color-surface-1)] border-[var(--color-border-hairline)]',
        'hover:bg-[var(--color-surface-2)] hover:border-[var(--color-border-strong)]',
        'transition-colors duration-[150ms] no-underline'
      )}
    >
      {/* Top meta */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono uppercase tracking-[0.07em] text-[var(--color-fg-tertiary)]">
          {note.type}
        </span>
        <span className={cn('text-[11px] font-mono uppercase tracking-[0.07em]', MATURITY_COLOR[note.maturity])}>
          {note.maturity}
        </span>
      </div>

      {/* Title + excerpt */}
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="text-title-sm text-[var(--color-fg)] leading-snug line-clamp-2">
          {note.title}
        </h3>
        <p className="text-body-sm text-[var(--color-fg-muted)] line-clamp-2 leading-relaxed">
          {note.excerpt}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 pt-3 border-t border-[var(--color-border-hairline)] text-caption text-[var(--color-fg-tertiary)]">
        <span>{note.readMin} min</span>
        <span>&middot;</span>
        <span>{note.topic}</span>
        <span>&middot;</span>
        <span>{note.backlinks} backlinks</span>
        <span className="ml-auto text-[11px] opacity-0 group-hover:opacity-100 transition-opacity duration-[150ms] font-mono uppercase tracking-[0.07em] text-[var(--color-fg-muted)]">
          Open &rsaquo;
        </span>
      </div>
    </Link>
  );
}

function NoteRowList({ note, workspace }: NoteCardProps) {
  return (
    <Link
      to="/app/w/$workspace/notes/$slug"
      params={{ workspace, slug: note.slug }}
      className={cn(
        'group flex items-start gap-5 px-5 py-4 border-b border-[var(--color-border-hairline)]',
        'hover:bg-[var(--color-surface-1)] transition-colors duration-[150ms] no-underline'
      )}
    >
      <span className={cn('text-[11px] font-mono uppercase tracking-[0.07em] w-20 shrink-0 pt-0.5', MATURITY_COLOR[note.maturity])}>
        {note.maturity}
      </span>
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <span className="text-title-sm text-[var(--color-fg)] truncate">{note.title}</span>
        <span className="text-body-sm text-[var(--color-fg-muted)] line-clamp-1">{note.excerpt}</span>
      </div>
      <div className="flex items-center gap-3 shrink-0 text-caption text-[var(--color-fg-tertiary)]">
        <span className="hidden lg:inline text-[11px] font-mono uppercase tracking-[0.07em]">{note.type}</span>
        <span>{note.readMin}m</span>
        <span>{note.updatedAgo}</span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-[150ms] text-[var(--color-fg-muted)]">&rsaquo;</span>
      </div>
    </Link>
  );
}

function NoteRowTable({ note, workspace }: NoteCardProps) {
  return (
    <tr className="group border-b border-[var(--color-border-hairline)] hover:bg-[var(--color-surface-1)] transition-colors duration-[150ms]">
      <td className="py-3 px-4">
        <Link
          to="/app/w/$workspace/notes/$slug"
          params={{ workspace, slug: note.slug }}
          className="text-body-sm text-[var(--color-fg)] hover:text-[var(--color-fg-muted)] no-underline line-clamp-1 block"
        >
          {note.title}
        </Link>
      </td>
      <td className="py-3 px-4 text-[11px] font-mono uppercase tracking-[0.07em] text-[var(--color-fg-tertiary)] whitespace-nowrap">{note.type}</td>
      <td className={cn('py-3 px-4 text-[11px] font-mono uppercase tracking-[0.07em] whitespace-nowrap', MATURITY_COLOR[note.maturity])}>{note.maturity}</td>
      <td className="py-3 px-4 text-caption text-[var(--color-fg-tertiary)] whitespace-nowrap">{note.topic}</td>
      <td className="py-3 px-4 text-caption text-[var(--color-fg-tertiary)] text-right whitespace-nowrap">{note.backlinks}</td>
      <td className="py-3 px-4 text-caption text-[var(--color-fg-tertiary)] text-right whitespace-nowrap">{note.updatedAgo}</td>
    </tr>
  );
}

// ── Page ──────────────────────────────────────────────────────

function NotesList() {
  const { workspace } = Route.useParams();

  const [query,         setQuery]         = useState('');
  const [typeFilter,    setTypeFilter]    = useState<TypeFilter>('ALL');
  const [sortMode,      setSortMode]      = useState<SortMode>('NEWEST');
  const [topicFilter,   setTopicFilter]   = useState<string | null>(null);
  const [tagFilter,     setTagFilter]     = useState<string | null>(null);
  const [maturityFil,   setMaturityFil]   = useState<Maturity | 'all'>('all');
  const [visFil,        setVisFil]        = useState<Visibility | 'all'>('all');
  const [viewMode,      setViewMode]      = useState<ViewMode>('GRID');
  const [page,          setPage]          = useState(1);

  const PAGE_SIZE = 12;

  const filtered = MOCK_NOTES.filter((n) => {
    if (query && !n.title.toLowerCase().includes(query.toLowerCase()) && !n.excerpt.toLowerCase().includes(query.toLowerCase())) return false;
    if (typeFilter !== 'ALL' && n.type !== typeFilter) return false;
    if (topicFilter && n.topic !== topicFilter) return false;
    if (tagFilter && !n.tags.includes(tagFilter)) return false;
    if (maturityFil !== 'all' && n.maturity !== maturityFil) return false;
    if (visFil !== 'all' && n.visibility !== visFil) return false;
    return true;
  }).sort((a, b) => {
    if (sortMode === 'A-Z')          return a.title.localeCompare(b.title);
    if (sortMode === 'MOST LINKED')  return b.backlinks - a.backlinks;
    if (sortMode === 'OLDEST')       return a.id - b.id;
    return b.id - a.id; // NEWEST
  });

  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore   = paginated.length < filtered.length;

  return (
    <div className="flex gap-8 min-h-0">
      {/* ── Facets sidebar ── */}
      <aside className="w-[220px] shrink-0 flex flex-col gap-8 pt-1">
        {/* Topics */}
        <div>
          <p className="text-label-uppercase text-[var(--color-fg-tertiary)] mb-3">Topics</p>
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => setTopicFilter(null)}
              className={cn(
                'flex items-center justify-between px-2 py-1.5 rounded-[var(--radius-sm)] text-body-sm transition-colors duration-[150ms] text-left',
                topicFilter === null
                  ? 'bg-[var(--color-surface-2)] text-[var(--color-fg)]'
                  : 'text-[var(--color-fg-muted)] hover:bg-[var(--color-surface-1)] hover:text-[var(--color-fg)]'
              )}
            >
              <span>All topics</span>
              <span className="text-caption text-[var(--color-fg-tertiary)]">{MOCK_NOTES.length}</span>
            </button>
            {TOPICS.map((t) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setTopicFilter(topicFilter === t.name ? null : t.name)}
                className={cn(
                  'flex items-center justify-between px-2 py-1.5 rounded-[var(--radius-sm)] text-body-sm transition-colors duration-[150ms] text-left',
                  topicFilter === t.name
                    ? 'bg-[var(--color-surface-2)] text-[var(--color-fg)]'
                    : 'text-[var(--color-fg-muted)] hover:bg-[var(--color-surface-1)] hover:text-[var(--color-fg)]'
                )}
              >
                <span>{t.name}</span>
                <span className="text-caption text-[var(--color-fg-tertiary)]">{t.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <p className="text-label-uppercase text-[var(--color-fg-tertiary)] mb-3">Tags</p>
          <div className="flex flex-wrap gap-1.5">
            {TOP_TAGS.map((t) => (
              <FacetChip
                key={t}
                active={tagFilter === t}
                onClick={() => setTagFilter(tagFilter === t ? null : t)}
              >
                #{t}
              </FacetChip>
            ))}
          </div>
        </div>

        {/* Maturity */}
        <div>
          <p className="text-label-uppercase text-[var(--color-fg-tertiary)] mb-3">Maturity</p>
          <div className="flex flex-wrap gap-1.5">
            {MATURITY_OPTS.map((o) => (
              <FacetChip
                key={o.value}
                active={maturityFil === o.value}
                onClick={() => setMaturityFil(o.value as typeof maturityFil)}
              >
                {o.label}
              </FacetChip>
            ))}
          </div>
        </div>

        {/* Visibility */}
        <div>
          <p className="text-label-uppercase text-[var(--color-fg-tertiary)] mb-3">Visibility</p>
          <div className="flex flex-wrap gap-1.5">
            {VISIBILITY_OPTS.map((o) => (
              <FacetChip
                key={o.value}
                active={visFil === o.value}
                onClick={() => setVisFil(o.value as typeof visFil)}
              >
                {o.label}
              </FacetChip>
            ))}
          </div>
        </div>
      </aside>

      {/* ── Main column ── */}
      <div className="flex-1 min-w-0 flex flex-col gap-0">
        {/* Header band */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-label-uppercase text-[var(--color-fg-tertiary)] mb-1.5">
              {workspace.toUpperCase()} &middot; @vincenzo &middot; NOTES
            </p>
            <h1 className="text-display-md text-[var(--color-fg)]">Notes</h1>
            <p className="text-body-sm text-[var(--color-fg-muted)] mt-1">
              {MOCK_NOTES.length} notes &mdash; last edit 2 hours ago
            </p>
          </div>
          <Link
            to="/app/w/$workspace/notes/$slug"
            params={{ workspace, slug: '__new__' }}
            className="btn-pill-primary no-underline text-[14px] gap-1.5 mt-1"
          >
            + New note
          </Link>
        </div>

        {/* Filter strip */}
        <div className={cn(
          'sticky top-0 z-10 flex items-center gap-3 py-3 mb-6',
          'border-b border-[var(--color-border-hairline)]',
          'bg-[var(--color-canvas)]/95 backdrop-blur-sm'
        )}>
          {/* Search */}
          <div className="relative flex-1 max-w-[260px]">
            <Search size={14} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-tertiary)] pointer-events-none" />
            <input
              type="search"
              placeholder="Search notes..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              className={cn(
                'w-full pl-9 pr-4 py-2 rounded-[var(--radius-input)] text-body-sm',
                'bg-[var(--color-surface-1)] text-[var(--color-fg)] placeholder:text-[var(--color-fg-quaternary)]',
                'border border-[var(--color-border-hairline)] focus:border-[var(--color-border-strong)]',
                'outline-none transition-colors duration-[150ms]'
              )}
            />
          </div>

          {/* Type chips */}
          <div className="flex items-center gap-1.5 flex-1">
            {TYPE_FILTERS.map((f) => (
              <FacetChip key={f} active={typeFilter === f} onClick={() => { setTypeFilter(f); setPage(1); }}>
                {f}
              </FacetChip>
            ))}
          </div>

          {/* Sort chips */}
          <div className="flex items-center gap-1.5">
            {SORT_MODES.map((s) => (
              <FacetChip key={s} active={sortMode === s} onClick={() => setSortMode(s)}>
                {s}
              </FacetChip>
            ))}
          </div>
        </div>

        {/* Results header row */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-caption text-[var(--color-fg-tertiary)]">
            {filtered.length === 0 ? 'No results' : `${filtered.length} notes`}
          </p>
          <ViewToggle value={viewMode} onChange={setViewMode} />
        </div>

        {/* Grid view */}
        {viewMode === 'GRID' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginated.map((n) => (
              <NoteCardGrid key={n.id} note={n} workspace={workspace} />
            ))}
          </div>
        )}

        {/* List view */}
        {viewMode === 'LIST' && (
          <div className="border border-[var(--color-border-hairline)] rounded-[var(--radius-card)] overflow-hidden">
            {paginated.map((n) => (
              <NoteRowList key={n.id} note={n} workspace={workspace} />
            ))}
          </div>
        )}

        {/* Table view */}
        {viewMode === 'TABLE' && (
          <div className="border border-[var(--color-border-hairline)] rounded-[var(--radius-card)] overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--color-border-hairline)]">
                  {['Title', 'Type', 'Maturity', 'Topic', 'Links', 'Updated'].map((h) => (
                    <th key={h} className="px-4 py-3 text-[11px] font-mono uppercase tracking-[0.07em] text-[var(--color-fg-tertiary)] whitespace-nowrap font-normal">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((n) => (
                  <NoteRowTable key={n.id} note={n} workspace={workspace} />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 border border-dashed border-[var(--color-border-hairline)] rounded-[var(--radius-card)]">
            <p className="text-title-sm text-[var(--color-fg)] mb-2">No notes found</p>
            <p className="text-body-sm text-[var(--color-fg-muted)]">Try adjusting your filters or search query.</p>
          </div>
        )}

        {/* Pagination */}
        {hasMore && (
          <div className="flex items-center justify-center pt-8 mt-2">
            <button
              type="button"
              onClick={() => setPage((p) => p + 1)}
              className="btn-pill-secondary text-[13px]"
            >
              Showing {paginated.length} of {filtered.length} &middot; Load more &rarr;
            </button>
          </div>
        )}
        {!hasMore && filtered.length > 0 && (
          <p className="text-caption text-[var(--color-fg-tertiary)] text-center pt-8 mt-2">
            Showing all {filtered.length} notes
          </p>
        )}
      </div>
    </div>
  );
}
