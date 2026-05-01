import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Pencil,
  FileText,
  Bookmark,
  Hash,
  ArrowRight,
  CheckSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Stat } from '@/components/ui/Stat';

export const Route = createFileRoute('/app/w/$workspace/')({
  component: WorkspaceDashboard,
});

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

type ActivityType = 'note' | 'article' | 'bookmark';
type StatusType = 'evergreen' | 'draft' | 'seedling' | 'published';

interface ActivityRow {
  id: string;
  type: ActivityType;
  title: string;
  topic: string;
  updatedAt: string;
  status: StatusType;
  slug: string;
}

interface DraftItem {
  id: string;
  title: string;
  topic: string;
  updatedAt: string;
}

interface TaskItem {
  id: string;
  label: string;
  done: boolean;
}

interface TopicBar {
  name: string;
  count: number;
  pct: number;
}

interface WeekDigest {
  week: string;
  notes: number;
  articles: number;
}

const ACTIVITY: ActivityRow[] = [
  { id: '1', type: 'note', title: 'Why DDD is harder than it looks', topic: 'engineering/software', updatedAt: '2h ago', status: 'evergreen', slug: 'why-ddd-is-harder' },
  { id: '2', type: 'article', title: 'The compounding effect of writing daily', topic: 'productivity', updatedAt: '5h ago', status: 'draft', slug: 'compounding-writing' },
  { id: '3', type: 'bookmark', title: 'React 19 compiler deep dive — Vercel blog', topic: 'engineering/react', updatedAt: 'yesterday', status: 'published', slug: 'react-19-compiler' },
  { id: '4', type: 'note', title: 'On Marcus Aurelius and silence', topic: 'philosophy/stoicism', updatedAt: 'yesterday', status: 'evergreen', slug: 'aurelius-silence' },
  { id: '5', type: 'article', title: 'Building a second brain with plain files', topic: 'pkm', updatedAt: '2d ago', status: 'draft', slug: 'second-brain-plain-files' },
  { id: '6', type: 'note', title: 'Observations on remote async teams', topic: 'management', updatedAt: '2d ago', status: 'seedling', slug: 'async-teams' },
  { id: '7', type: 'bookmark', title: 'How Linear ships fast — Linear blog', topic: 'engineering/product', updatedAt: '3d ago', status: 'published', slug: 'linear-ships-fast' },
  { id: '8', type: 'note', title: 'The illusion of urgency in knowledge work', topic: 'productivity', updatedAt: '4d ago', status: 'evergreen', slug: 'illusion-urgency' },
];

const DRAFTS: DraftItem[] = [
  { id: 'd1', title: 'Building a second brain with plain files', topic: 'pkm', updatedAt: '5h ago' },
  { id: 'd2', title: 'The compounding effect of writing daily', topic: 'productivity', updatedAt: 'yesterday' },
  { id: 'd3', title: 'Notes on distributed system failures', topic: 'engineering/infra', updatedAt: '2d ago' },
  { id: 'd4', title: 'What Seneca teaches about time', topic: 'philosophy/stoicism', updatedAt: '3d ago' },
  { id: 'd5', title: 'First principles of good API design', topic: 'engineering/software', updatedAt: '4d ago' },
];

const TASKS: TaskItem[] = [
  { id: 't1', label: 'Review draft on Stoicism', done: false },
  { id: 't2', label: 'Tag 8 untagged notes', done: false },
  { id: 't3', label: 'Cleanup orphan bookmarks', done: true },
];

const TOPICS: TopicBar[] = [
  { name: 'engineering/software', count: 28, pct: 90 },
  { name: 'philosophy/stoicism', count: 22, pct: 71 },
  { name: 'productivity', count: 18, pct: 58 },
  { name: 'engineering/react', count: 15, pct: 48 },
  { name: 'pkm', count: 14, pct: 45 },
  { name: 'management', count: 11, pct: 35 },
  { name: 'engineering/infra', count: 9, pct: 29 },
  { name: 'engineering/product', count: 7, pct: 23 },
  { name: 'communication', count: 5, pct: 16 },
  { name: 'reading-notes', count: 3, pct: 10 },
];

const WEEKS: WeekDigest[] = [
  { week: 'Apr 1–7', notes: 4, articles: 1 },
  { week: 'Apr 8–14', notes: 7, articles: 2 },
  { week: 'Apr 15–21', notes: 5, articles: 1 },
  { week: 'Apr 22–28', notes: 9, articles: 3 },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const TYPE_LABELS: Record<ActivityType, string> = {
  note: 'NOTE',
  article: 'ARTICLE',
  bookmark: 'BOOKMARK',
};

const STATUS_COLORS: Record<StatusType, string> = {
  evergreen: 'text-[#4ade80]',
  published: 'text-[#60a5fa]',
  draft: 'text-[#a3a3a3]',
  seedling: 'text-[#facc15]',
};

function Meta({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#737373] mb-2">
      {children}
    </p>
  );
}

function SectionHead({ meta, heading }: { meta: string; heading: string }) {
  return (
    <div className="mb-8">
      <Meta>{meta}</Meta>
      <h2 className="text-[28px] font-bold text-[#ffffff] leading-none tracking-tight">
        {heading}
      </h2>
    </div>
  );
}

function Hairline({ className = '' }: { className?: string }) {
  return <div className={`border-t border-[rgba(255,255,255,0.08)] ${className}`} />;
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

function WorkspaceDashboard() {
  const { workspace } = Route.useParams();

  return (
    <div className="max-w-[1200px] mx-auto space-y-0">

      {/* ------------------------------------------------------------------ */}
      {/* 1. TOP HEADER BAND                                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="pb-12 border-b border-[rgba(255,255,255,0.08)]">
        <Meta>WORKSPACE · @{workspace}</Meta>
        <h1 className="text-[52px] font-bold text-[#ffffff] leading-none tracking-tight mb-3">
          Good evening, Vincenzo.
        </h1>
        <p className="text-[15px] text-[#737373] mb-8">
          Today is Friday&nbsp;&middot;&nbsp;5 drafts&nbsp;&middot;&nbsp;2 due
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" size="sm">
            New note +
          </Button>
          <Button variant="secondary" size="sm">
            New article
          </Button>
          <Button variant="secondary" size="sm">
            Import bookmark
          </Button>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. STATS GRID                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-b border-[rgba(255,255,255,0.08)]">
        <div className="grid grid-cols-5 divide-x divide-[rgba(255,255,255,0.08)]">
          <div className="py-10 pr-8">
            <Stat value="120" label="NOTES TOTAL" />
          </div>
          <div className="py-10 px-8">
            <Stat value="18" label="ARTICLES" />
          </div>
          <div className="py-10 px-8">
            <Stat value="45" label="BOOKMARKS" />
          </div>
          <div className="py-10 px-8">
            <Stat value="12" label="TOPICS" />
          </div>
          <div className="py-10 pl-8">
            <Stat value="60%" label="PUBLIC" />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. RECENT ACTIVITY                                                  */}
      {/* ------------------------------------------------------------------ */}
      <section id="recent" className="py-12 border-b border-[rgba(255,255,255,0.08)]">
        <SectionHead meta="ACTIVITY · LAST 7 DAYS" heading="Recent edits" />

        <div className="w-full">
          {/* Table head */}
          <div className="grid grid-cols-[120px_1fr_180px_100px_100px] gap-4 pb-3 border-b border-[rgba(255,255,255,0.08)]">
            {(['TYPE', 'TITLE', 'TOPIC', 'UPDATED', 'STATUS'] as const).map((h) => (
              <span key={h} className="text-[11px] font-mono uppercase tracking-[0.10em] text-[#737373]">
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          {ACTIVITY.map((row) => (
            <Link
              key={row.id}
              to="/app/w/$workspace/notes/$slug"
              params={{ workspace, slug: row.slug }}
              className="grid grid-cols-[120px_1fr_180px_100px_100px] gap-4 items-center py-4 border-b border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.03)] transition-colors no-underline group"
            >
              <Badge>{TYPE_LABELS[row.type]}</Badge>
              <span className="text-[14px] text-[#e5e5e5] group-hover:text-white transition-colors truncate">
                {row.title}
              </span>
              <span className="text-[12px] font-mono text-[#737373] truncate">
                {row.topic}
              </span>
              <span className="text-[12px] text-[#737373]">{row.updatedAt}</span>
              <span className={`text-[11px] font-mono uppercase tracking-wide ${STATUS_COLORS[row.status]}`}>
                {row.status}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. DRAFTS + TASKS (2-col)                                           */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-12 border-b border-[rgba(255,255,255,0.08)]">
        <div className="grid grid-cols-[3fr_2fr] gap-8">

          {/* Drafts */}
          <div>
            <SectionHead meta="IN PROGRESS" heading="Drafts" />
            <div className="border border-[rgba(255,255,255,0.08)] rounded-[4px]">
              {DRAFTS.map((draft, i) => (
                <div
                  key={draft.id}
                  className={`flex items-center justify-between px-5 py-4 ${
                    i < DRAFTS.length - 1 ? 'border-b border-[rgba(255,255,255,0.06)]' : ''
                  }`}
                >
                  <div className="min-w-0 flex-1 mr-4">
                    <p className="text-[14px] text-[#e5e5e5] truncate">{draft.title}</p>
                    <p className="text-[11px] font-mono text-[#737373] mt-0.5">{draft.topic} · {draft.updatedAt}</p>
                  </div>
                  <button
                    type="button"
                    className="text-[#737373] hover:text-[#e5e5e5] transition-colors flex-shrink-0"
                    aria-label={`Edit draft: ${draft.title}`}
                  >
                    <Pencil size={14} strokeWidth={1.5} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div>
            <SectionHead meta="REMINDERS" heading="Tasks" />
            <div className="border border-[rgba(255,255,255,0.08)] rounded-[4px]">
              {TASKS.map((task, i) => (
                <div
                  key={task.id}
                  className={`flex items-start gap-3 px-5 py-4 ${
                    i < TASKS.length - 1 ? 'border-b border-[rgba(255,255,255,0.06)]' : ''
                  }`}
                >
                  <CheckSquare
                    size={15}
                    strokeWidth={1.5}
                    className={task.done ? 'text-[#4ade80] mt-0.5' : 'text-[#525252] mt-0.5'}
                  />
                  <p
                    className={`text-[14px] leading-snug ${
                      task.done ? 'line-through text-[#525252]' : 'text-[#e5e5e5]'
                    }`}
                  >
                    {task.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. TOPICS DISTRIBUTION                                              */}
      {/* ------------------------------------------------------------------ */}
      <section id="topics-stats" className="py-12 border-b border-[rgba(255,255,255,0.08)]">
        <SectionHead meta="TOPICS" heading="Where you write" />

        <div className="space-y-3">
          {TOPICS.map((t) => (
            <div key={t.name} className="grid grid-cols-[180px_1fr_48px] gap-4 items-center">
              <span className="text-[12px] font-mono text-[#737373] truncate">{t.name}</span>
              <div className="h-[6px] bg-[#1a1a1a] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#ffffff] rounded-full"
                  style={{ width: `${t.pct}%` }}
                />
              </div>
              <span className="text-[12px] font-mono text-[#737373] text-right">{t.count}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. THIS MONTH DIGEST                                                */}
      {/* ------------------------------------------------------------------ */}
      <section id="month" className="py-12 border-b border-[rgba(255,255,255,0.08)]">
        <SectionHead meta="APRIL 2026" heading="This month" />

        {/* 3 big stats */}
        <div className="grid grid-cols-3 divide-x divide-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.08)] rounded-[4px] mb-10">
          <div className="px-8 py-8">
            <Stat value="21" label="NOTES PUBLISHED" />
          </div>
          <div className="px-8 py-8">
            <Stat value="14h" label="HOURS OF WRITING" />
          </div>
          <div className="px-8 py-8">
            <Stat value="9" label="NEW BOOKMARKS" />
          </div>
        </div>

        {/* 4-col week mini-timeline */}
        <div className="grid grid-cols-4 gap-4">
          {WEEKS.map((w) => (
            <div
              key={w.week}
              className="border border-[rgba(255,255,255,0.08)] rounded-[4px] px-5 py-5"
            >
              <p className="text-[11px] font-mono uppercase tracking-[0.10em] text-[#737373] mb-4">
                {w.week}
              </p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[12px] text-[#737373]">Notes</span>
                  <span className="text-[14px] font-bold text-[#ffffff]">{w.notes}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[12px] text-[#737373]">Articles</span>
                  <span className="text-[14px] font-bold text-[#ffffff]">{w.articles}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 7. QUICK LINKS BAND                                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-12">
        <Meta>QUICK ACTIONS</Meta>
        <div className="grid grid-cols-4 gap-4 mt-6">

          <QuickLinkCard
            icon={<FileText size={20} strokeWidth={1.5} />}
            title="Write a note"
            body="Capture a fleeting thought or evergreen idea."
          />
          <QuickLinkCard
            icon={<Pencil size={20} strokeWidth={1.5} />}
            title="Start an article"
            body="Begin a long-form piece with structure."
          />
          <QuickLinkCard
            icon={<Bookmark size={20} strokeWidth={1.5} />}
            title="Add a bookmark"
            body="Save an external link to revisit later."
          />
          <QuickLinkCard
            icon={<Hash size={20} strokeWidth={1.5} />}
            title="Browse by topic"
            body="Explore all notes grouped by taxonomy."
          />
        </div>
      </section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// QuickLinkCard
// ---------------------------------------------------------------------------

interface QuickLinkCardProps {
  icon: React.ReactNode;
  title: string;
  body: string;
}

function QuickLinkCard({ icon, title, body }: QuickLinkCardProps) {
  return (
    <button
      type="button"
      className="text-left border border-[rgba(255,255,255,0.08)] rounded-[4px] p-6 hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.16)] transition-colors group"
    >
      <div className="text-[#737373] group-hover:text-[#e5e5e5] transition-colors mb-4">
        {icon}
      </div>
      <h3 className="text-[15px] font-semibold text-[#e5e5e5] mb-2 flex items-center gap-2">
        {title}
        <ArrowRight
          size={14}
          strokeWidth={1.5}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </h3>
      <p className="text-[13px] text-[#737373] leading-snug">{body}</p>
    </button>
  );
}
