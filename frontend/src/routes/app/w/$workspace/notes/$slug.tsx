import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useCallback } from 'react';
import { MoreHorizontal, ChevronRight, Link2, ArrowUpRight, Highlighter, Tag as TagIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/app/w/$workspace/notes/$slug')({
  component: NoteDetail,
});

// ── Mock data ─────────────────────────────────────────────────

type NoteType       = 'NOTE' | 'ARTICLE' | 'BOOKMARK' | 'COLLECTION';
type Maturity       = 'seedling' | 'budding' | 'evergreen';
type Visibility     = 'public' | 'unlisted' | 'private';

interface MockTopic { id: number; name: string }
interface MockLink  { slug: string; title: string; type: NoteType }
interface MockHighlight { id: number; text: string; color: string }

interface MockNoteDetail {
  title:       string;
  type:        NoteType;
  maturity:    Maturity;
  visibility:  Visibility;
  topic:       MockTopic;
  tags:        string[];
  updatedAgo:  string;
  readMin:     number;
  body:        string;
  backlinks:   MockLink[];
  outgoing:    MockLink[];
  highlights:  MockHighlight[];
  linkedTopics: MockTopic[];
}

const MOCK_DETAIL: MockNoteDetail = {
  title:      'Why DDD is harder than it looks',
  type:       'ARTICLE',
  maturity:   'evergreen',
  visibility: 'public',
  topic:      { id: 1, name: 'Engineering' },
  tags:       ['ddd', 'architecture', 'backend', 'complexity'],
  updatedAgo: '2h ago',
  readMin:    12,
  body: `# Why DDD is harder than it looks

Domain-driven design is one of those ideas that makes perfect sense the moment you read about it. Ubiquitous language, bounded contexts, aggregates — the vocabulary alone feels like clarity. Then you try to apply it to a real system and the seams appear.

## The aggregate problem

Every aggregate boundary you draw is a bet about what changes together. Get it wrong and you end up with either massive aggregates that serialise everything through a single root, or fine-grained aggregates that create consistency nightmares across transaction boundaries.

The canonical example is an Order and its OrderLines. They seem obviously coupled. But when you need to query "all lines across orders for this product in this region for this quarter" you feel the pain of having buried lines inside order aggregates.

## Ubiquitous language decays

The language you capture in an event-storming session is correct at the moment it is produced. Six months later, the domain experts have changed their vocabulary — they stopped calling them "subscriptions" and started calling them "plans" — but your codebase still uses the old terms. The map diverges from the territory.

## What actually helps

1. **Keep aggregates small.** Resist the urge to group everything that "belongs together."
2. **Revisit the language regularly.** Treat the ubiquitous language as a living document, not a deliverable.
3. **Use domain events at boundaries.** The moment you need to coordinate across aggregates, reach for events rather than service calls.
4. **Accept that bounded contexts overlap.** The goal is not clean separation — it is manageable coupling.

The honest version of DDD is messier than the book version. That is fine. The book is showing you a destination, not a prescription.`,
  backlinks: [
    { slug: 'event-sourcing-tradeoffs',  title: 'Event sourcing: the hidden tradeoffs',    type: 'ARTICLE' },
    { slug: 'bounded-contexts-map',      title: 'Bounded contexts map — Pinakes',           type: 'COLLECTION' },
    { slug: 'team-topology-patterns',    title: 'Team topology patterns I have seen work',  type: 'NOTE' },
  ],
  outgoing: [
    { slug: 'event-sourcing-tradeoffs',  title: 'Event sourcing: the hidden tradeoffs',     type: 'ARTICLE' },
    { slug: 'second-brain-principles',   title: 'Second brain — core principles',            type: 'COLLECTION' },
    { slug: 'zettelkasten-workflow',     title: 'My Zettelkasten workflow in 2026',          type: 'ARTICLE' },
    { slug: 'writing-to-think',          title: 'Writing to think',                          type: 'NOTE' },
    { slug: 'on-taste',                  title: 'On taste and the gap',                      type: 'NOTE' },
  ],
  highlights: [
    { id: 1, text: 'Every aggregate boundary you draw is a bet about what changes together.',                    color: '#d4b483' },
    { id: 2, text: 'The moment you need to coordinate across aggregates, reach for events rather than service calls.', color: '#86d4a3' },
  ],
  linkedTopics: [
    { id: 1, name: 'Engineering' },
    { id: 3, name: 'Architecture' },
    { id: 7, name: 'Learning' },
  ],
};

const TOPICS: MockTopic[] = [
  { id: 1, name: 'Engineering' }, { id: 2, name: 'Learning' }, { id: 3, name: 'Architecture' },
  { id: 4, name: 'Philosophy' },  { id: 5, name: 'Productivity' }, { id: 6, name: 'Craft' },
];

const ALL_TAGS = ['ddd', 'architecture', 'backend', 'react', 'typescript', 'pkm', 'stoicism', 'writing', 'complexity'];

const MATURITY_OPTS: Maturity[]    = ['seedling', 'budding', 'evergreen'];
const VISIBILITY_OPTS: Visibility[] = ['public', 'unlisted', 'private'];
const TYPE_OPTS: NoteType[]        = ['NOTE', 'ARTICLE', 'BOOKMARK', 'COLLECTION'];

// ── Helpers ───────────────────────────────────────────────────

const MATURITY_COLOR: Record<Maturity, string> = {
  seedling:  'text-[var(--color-maturity-seedling)]',
  budding:   'text-[var(--color-maturity-budding)]',
  evergreen: 'text-[var(--color-maturity-evergreen)]',
};

// ── Sub-components ────────────────────────────────────────────

interface InlineSelectProps<T extends string> {
  value: T;
  options: T[];
  onChange: (v: T) => void;
  className?: string;
}

function InlineSelect<T extends string>({ value, options, onChange, className }: InlineSelectProps<T>) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className={cn(
        'bg-[var(--color-surface-2)] border border-[var(--color-border-hairline)]',
        'rounded-[var(--radius-chip)] px-2.5 py-1 text-[11px] font-mono uppercase tracking-[0.07em]',
        'text-[var(--color-fg-muted)] outline-none cursor-pointer',
        'hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)]',
        'transition-colors duration-[150ms]',
        className
      )}
    >
      {options.map((o) => (
        <option key={o} value={o} className="bg-[#1a1a1a] text-white">
          {o}
        </option>
      ))}
    </select>
  );
}

interface TagToggleProps {
  tag: string;
  active: boolean;
  onToggle: (tag: string) => void;
}

function TagToggle({ tag, active, onToggle }: TagToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(tag)}
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-[var(--radius-chip)] text-[11px] font-mono tracking-[0.07em] border transition-colors duration-[150ms]',
        active
          ? 'bg-[var(--color-fg)] text-[var(--color-canvas)] border-[var(--color-fg)]'
          : 'bg-[var(--color-surface-2)] text-[var(--color-fg-muted)] border-[var(--color-border-hairline)] hover:border-[var(--color-border-strong)]'
      )}
    >
      #{tag}
    </button>
  );
}

interface SideCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function SideCard({ title, icon, children }: SideCardProps) {
  return (
    <div className="bg-[var(--color-surface-1)] border border-[var(--color-border-hairline)] rounded-[var(--radius-card)] overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[var(--color-border-hairline)]">
        <span className="text-[var(--color-fg-tertiary)]">{icon}</span>
        <span className="text-[11px] font-mono uppercase tracking-[0.07em] text-[var(--color-fg-muted)]">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

interface LinkRowProps {
  link: MockLink;
  workspace: string;
}

function LinkRow({ link, workspace }: LinkRowProps) {
  return (
    <Link
      to="/app/w/$workspace/notes/$slug"
      params={{ workspace, slug: link.slug }}
      className={cn(
        'flex items-center justify-between gap-2 py-2 border-b border-[var(--color-border-hairline)] last:border-0',
        'hover:text-[var(--color-fg)] no-underline group'
      )}
    >
      <span className="text-body-sm text-[var(--color-fg-muted)] group-hover:text-[var(--color-fg)] transition-colors duration-[150ms] line-clamp-1 flex-1">
        {link.title}
      </span>
      <span className="text-[10px] font-mono uppercase tracking-[0.07em] text-[var(--color-fg-tertiary)] shrink-0">
        {link.type}
      </span>
    </Link>
  );
}

// ── 3-dot menu (simple dropdown) ─────────────────────────────

interface ActionMenuProps {
  open: boolean;
  onToggle: () => void;
}

function ActionMenu({ open, onToggle }: ActionMenuProps) {
  const items = ['Publish', 'Unpublish', 'Archive', 'Delete'];
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="inline-flex items-center justify-center w-8 h-8 rounded-[var(--radius-sm)] border border-[var(--color-border-hairline)] text-[var(--color-fg-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)] transition-colors duration-[150ms]"
        aria-label="Note actions"
      >
        <MoreHorizontal size={14} strokeWidth={1.5} />
      </button>
      {open && (
        <div className={cn(
          'absolute right-0 top-10 z-20 w-44 py-1',
          'bg-[var(--color-surface-2)] border border-[var(--color-border-strong)] rounded-[var(--radius-md)]',
          'animate-dropdown-in shadow-lg'
        )}>
          {items.map((item) => (
            <button
              key={item}
              type="button"
              onClick={onToggle}
              className={cn(
                'w-full text-left px-4 py-2.5 text-body-sm transition-colors duration-[150ms]',
                item === 'Delete'
                  ? 'text-[var(--color-error)] hover:bg-[var(--color-surface-3)]'
                  : 'text-[var(--color-fg-muted)] hover:bg-[var(--color-surface-3)] hover:text-[var(--color-fg)]'
              )}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────

function NoteDetail() {
  const { workspace } = Route.useParams();

  const [title,      setTitle]      = useState(MOCK_DETAIL.title);
  const [type,       setType]       = useState<NoteType>(MOCK_DETAIL.type);
  const [maturity,   setMaturity]   = useState<Maturity>(MOCK_DETAIL.maturity);
  const [visibility, setVisibility] = useState<Visibility>(MOCK_DETAIL.visibility);
  const [topic,      setTopic]      = useState<string>(MOCK_DETAIL.topic.name);
  const [tags,       setTags]       = useState<string[]>(MOCK_DETAIL.tags);
  const [body,       setBody]       = useState(MOCK_DETAIL.body);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [savedAgo,   setSavedAgo]   = useState('Saved 2s ago');
  const [isDirty,    setIsDirty]    = useState(false);

  const handleBodyChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
    setIsDirty(true);
    setSavedAgo('Unsaved changes');
  }, []);

  const handleSave = useCallback(() => {
    setIsDirty(false);
    setSavedAgo('Saved just now');
  }, []);

  const handleCancel = useCallback(() => {
    setBody(MOCK_DETAIL.body);
    setIsDirty(false);
    setSavedAgo('Saved 2s ago');
  }, []);

  const toggleTag = useCallback((tag: string) => {
    setTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  }, []);

  const titleSlug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').slice(0, 40);

  return (
    <div className="flex flex-col gap-0 min-h-0">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 mb-6 text-[11px] font-mono uppercase tracking-[0.07em] text-[var(--color-fg-tertiary)]">
        <Link to="/app/w/$workspace" params={{ workspace }} className="hover:text-[var(--color-fg-muted)] no-underline transition-colors duration-[150ms]">
          {workspace.toUpperCase()}
        </Link>
        <ChevronRight size={10} strokeWidth={1.5} />
        <Link to="/app/w/$workspace/notes" params={{ workspace }} className="hover:text-[var(--color-fg-muted)] no-underline transition-colors duration-[150ms]">
          NOTES
        </Link>
        <ChevronRight size={10} strokeWidth={1.5} />
        <span className="text-[var(--color-fg-muted)] truncate max-w-[340px]">
          {title.toUpperCase()}
        </span>
      </nav>

      {/* Title row */}
      <div className="flex items-start justify-between gap-6 mb-5">
        <input
          type="text"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setIsDirty(true); }}
          placeholder="Untitled note"
          className={cn(
            'flex-1 bg-transparent text-display-md text-[var(--color-fg)]',
            'placeholder:text-[var(--color-fg-quaternary)]',
            'border-none outline-none',
            'focus:ring-0 p-0'
          )}
        />
        <div className="flex items-center gap-3 shrink-0 pt-1">
          <span className="text-caption text-[var(--color-fg-tertiary)] whitespace-nowrap">
            <span className={cn('font-mono uppercase tracking-[0.07em] text-[11px]', MATURITY_COLOR[maturity])}>
              {maturity}
            </span>
            {' '}&middot;{' '}
            <span>{visibility}</span>
            {' '}&middot;{' '}
            <span>last edit {MOCK_DETAIL.updatedAgo}</span>
          </span>
          <ActionMenu open={menuOpen} onToggle={() => setMenuOpen((v) => !v)} />
        </div>
      </div>

      {/* Toolbar */}
      <div className={cn(
        'flex items-center gap-2 flex-wrap py-3 mb-6',
        'border-b border-[var(--color-border-hairline)]'
      )}>
        {/* Type */}
        <InlineSelect value={type} options={TYPE_OPTS} onChange={setType} />

        {/* Topic */}
        <InlineSelect
          value={topic}
          options={TOPICS.map((t) => t.name) as string[] as Maturity[]}
          onChange={(v) => setTopic(v as string)}
        />

        {/* Maturity */}
        <InlineSelect value={maturity} options={MATURITY_OPTS} onChange={setMaturity} />

        {/* Visibility */}
        <InlineSelect value={visibility} options={VISIBILITY_OPTS} onChange={setVisibility} />

        {/* Divider */}
        <span className="w-px h-5 bg-[var(--color-border-hairline)] mx-1" />

        {/* Tag toggles */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {ALL_TAGS.map((t) => (
            <TagToggle key={t} tag={t} active={tags.includes(t)} onToggle={toggleTag} />
          ))}
        </div>
      </div>

      {/* Two-col body */}
      <div className="flex gap-6 flex-1 min-h-0">
        {/* Editor column — 60% */}
        <div className="flex-[3] min-w-0">
          <textarea
            value={body}
            onChange={handleBodyChange}
            spellCheck={false}
            className={cn(
              'w-full min-h-[60vh] p-8 rounded-[var(--radius-card)]',
              'bg-[var(--color-surface-1)] border border-[var(--color-border-hairline)]',
              'text-body-sm text-[var(--color-fg-muted)] leading-relaxed font-mono',
              'placeholder:text-[var(--color-fg-quaternary)]',
              'resize-none outline-none',
              'focus:border-[var(--color-border-strong)]',
              'transition-colors duration-[150ms]',
              'scrollbar-thin'
            )}
          />
          {/* Slug hint */}
          <p className="mt-2 text-caption text-[var(--color-fg-tertiary)]">
            Slug: <span className="font-mono">{titleSlug}</span>
          </p>
        </div>

        {/* Right panel — 40% */}
        <div className="flex-[2] min-w-0 flex flex-col gap-4">
          {/* Backlinks */}
          <SideCard title={`Backlinks (${MOCK_DETAIL.backlinks.length})`} icon={<Link2 size={13} strokeWidth={1.5} />}>
            {MOCK_DETAIL.backlinks.map((l) => (
              <LinkRow key={l.slug} link={l} workspace={workspace} />
            ))}
          </SideCard>

          {/* Outgoing links */}
          <SideCard title={`Outgoing links (${MOCK_DETAIL.outgoing.length})`} icon={<ArrowUpRight size={13} strokeWidth={1.5} />}>
            {MOCK_DETAIL.outgoing.map((l) => (
              <LinkRow key={l.slug} link={l} workspace={workspace} />
            ))}
          </SideCard>

          {/* Highlights */}
          <SideCard title={`Highlights (${MOCK_DETAIL.highlights.length})`} icon={<Highlighter size={13} strokeWidth={1.5} />}>
            <div className="flex flex-col gap-3">
              {MOCK_DETAIL.highlights.map((h) => (
                <blockquote
                  key={h.id}
                  style={{ borderLeftColor: h.color }}
                  className="border-l-2 pl-3 text-body-sm text-[var(--color-fg-muted)] leading-relaxed italic"
                >
                  {h.text}
                </blockquote>
              ))}
            </div>
          </SideCard>

          {/* Linked topics */}
          <SideCard title="Linked topics" icon={<TagIcon size={13} strokeWidth={1.5} />}>
            <div className="flex flex-wrap gap-1.5">
              {MOCK_DETAIL.linkedTopics.map((t) => (
                <span
                  key={t.id}
                  className="inline-flex items-center px-2.5 py-1 rounded-[var(--radius-chip)] text-[11px] font-mono uppercase tracking-[0.07em] bg-[var(--color-surface-2)] border border-[var(--color-border-hairline)] text-[var(--color-fg-muted)]"
                >
                  {t.name}
                </span>
              ))}
            </div>
          </SideCard>
        </div>
      </div>

      {/* Bottom action bar */}
      <div className={cn(
        'sticky bottom-0 z-10 flex items-center justify-between',
        'px-0 py-4 mt-6',
        'border-t border-[var(--color-border-hairline)]',
        'bg-[var(--color-canvas)]/95 backdrop-blur-sm'
      )}>
        <span className={cn(
          'text-[11px] font-mono tracking-[0.07em]',
          isDirty ? 'text-[var(--color-warning)]' : 'text-[var(--color-fg-tertiary)]'
        )}>
          {savedAgo}
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="btn-pill-secondary text-[13px] px-5 py-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!isDirty}
            className={cn(
              'btn-pill-primary text-[13px] px-6 py-2',
              !isDirty && 'opacity-40 pointer-events-none'
            )}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
