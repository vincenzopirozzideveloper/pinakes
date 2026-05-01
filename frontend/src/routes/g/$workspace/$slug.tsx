import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { PublicLayout } from '@/app/layouts/PublicLayout';
import { Avatar } from '@/components/ui/Avatar';
import { Tag } from '@/components/ui/Tag';
import { Chip } from '@/components/ui/Chip';
import { TocSidebar } from '@/components/ui/TocSidebar';

export const Route = createFileRoute('/g/$workspace/$slug')({
  component: PublicContentView,
});

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

interface BacklinkItem {
  slug: string;
  title: string;
  excerpt: string;
  type: string;
}

interface RelatedItem {
  slug: string;
  title: string;
  excerpt: string;
  topic: string;
}

interface ReferenceItem {
  index: number;
  label: string;
  href: string;
}

interface ArticleMock {
  title: string;
  subtitle: string;
  publishedAt: string;
  readTime: number;
  maturity: 'EVERGREEN' | 'BUDDING' | 'SEEDLING';
  topicPath: string;
  tags: string[];
  // TODO: swap with a proper markdown-to-HTML lib (e.g. marked or remark)
  bodyHtml: string;
  backlinks: BacklinkItem[];
  related: RelatedItem[];
  references: ReferenceItem[];
}

const MOCK: ArticleMock = {
  title: 'Why DDD is harder than it looks',
  subtitle:
    'Domains are not folders. After three years of bouncing between Laravel anemic models and forced aggregates, here is what actually compounds.',
  publishedAt: '2026-04-12',
  readTime: 12,
  maturity: 'EVERGREEN',
  topicPath: 'engineering / software',
  tags: ['ddd', 'laravel', 'hexagonal'],
  bodyHtml: `
<h2 id="section-01">01 — The setup</h2>
<p>
  Everyone who reads Evans' blue book walks away convinced they understand what a
  <strong>Bounded Context</strong> is. Then they open their Laravel project, rename
  <code>app/Models</code> to <code>app/Domain</code>, and call it done. It isn't done.
  That is the beginning of the confusion.
</p>
<p>
  Domain-Driven Design is not an architectural pattern you bolt on top of a framework.
  It is a <em>collaborative modelling practice</em> that happens to produce useful code
  structures as a side-effect. The code is evidence that the conversation happened —
  not the conversation itself.
</p>

<h2 id="section-02">02 — Anemic models are not the enemy</h2>
<p>
  The standard DDD critique of active-record is that it leaks persistence concerns into
  the domain. True. But an anemic Eloquent model that delegates behaviour to a service
  is not the worst outcome. It is predictable. It is searchable. Junior developers do not
  get lost in it.
</p>
<blockquote>
  "The goal is not to achieve a pure domain layer. The goal is to make the important
  parts of the business explicit in code." — paraphrasing Alberto Brandolini, EventStorming
  workshop, 2019
</blockquote>
<p>
  The real cost of anemia is not coupling — it is that the domain logic disperses across
  service classes until nobody knows where anything lives. That is a discoverability problem,
  not a purity problem.
</p>

<h2 id="section-03">03 — Where aggregates actually help</h2>
<p>
  The aggregate pattern earns its cost in two specific scenarios: when you need to enforce
  invariants that span multiple objects atomically, and when your event stream is the source
  of truth. Outside those scenarios, forcing an aggregate boundary adds indirection for no
  runtime benefit.
</p>
<pre><code>// Aggregate root enforcing a business invariant
class Order
{
    private OrderLineCollection $lines;

    public function addLine(Product $product, int $qty): void
    {
        if ($this->lines->count() >= 50) {
            throw new OrderCapacityExceeded();
        }
        $this->lines->add(new OrderLine($product, $qty));
        $this->recordEvent(new OrderLineAdded($this->id, $product->id, $qty));
    }
}
</code></pre>
<p>
  Notice that <code>Order</code> does not call <code>save()</code>. It records events.
  The application service that owns the transaction boundary is responsible for hydrating,
  mutating, and persisting. That separation is what makes the aggregate testable in pure PHP
  without a database.
</p>

<h2 id="section-04">04 — The context map nobody draws</h2>
<p>
  On every project I have worked on that claimed to use DDD, the context map existed only in
  the head of the architect who left two years ago. Nobody drew it. Nobody maintains it.
</p>
<p>
  A context map does not need to be a diagram. A markdown file in the repo that says
  "the Billing context owns <code>invoices</code>, the CRM context owns <code>accounts</code>,
  they communicate via the <code>AccountActivated</code> integration event" is infinitely
  more useful than a PhpStorm UML diagram nobody opens.
</p>

<h2 id="section-05">05 — Laravel specifics</h2>
<p>
  Laravel is an active-record framework. Fighting that decision at the ORM level is expensive.
  The practical path is a thin anti-corruption layer:
</p>
<ul>
  <li>Domain entities are plain PHP objects with no Eloquent inheritance.</li>
  <li>Eloquent models live in an <code>Infrastructure</code> namespace and implement repository interfaces.</li>
  <li>The application layer maps between the two worlds.</li>
</ul>
<p>
  This adds boilerplate. It is worth it when the domain logic is complex enough that you need
  to test it in isolation. It is not worth it for a CRUD admin panel.
</p>

<h2 id="section-06">06 — What actually compounds</h2>
<p>
  After three years of iterating on this, two practices have compounded the most:
</p>
<p>
  First: naming things after business concepts, not technical ones. Not
  <code>OrderRepository::find()</code> but <code>OrderRepository::findByCustomerReference()</code>.
  The extra specificity pays dividends in grep results and in onboarding conversations.
</p>
<p>
  Second: Event Storming before coding. Even a 90-minute session with a whiteboard and
  sticky notes produces enough domain vocabulary to name things correctly the first time.
  Renaming is expensive. Starting with the right word is nearly free.
</p>

<h2 id="section-07">07 — The honest trade-off</h2>
<p>
  DDD adds accidental complexity in exchange for reduced essential complexity in the domain.
  The break-even point is higher than most teams expect. A 10-table CRUD application with
  straightforward business rules does not need aggregates, domain events, or a context map.
</p>
<p>
  Use the vocabulary. Use the ubiquitous language. Use the practice of making implicit
  concepts explicit. Skip the architectural overhead until the domain demands it.
</p>

<h2 id="section-08">08 — Resources that helped</h2>
<p>
  Three sources that changed how I read the blue book:
  Vaughn Vernon's <em>Implementing Domain-Driven Design</em> for the concrete Laravel-adjacent
  code, Scott Millett's <em>Patterns, Principles and Practices of DDD</em> for the
  context-map chapter, and Mathias Verraes' blog for the conceptual nuance that neither
  book covers.
</p>
`,
  backlinks: [
    {
      slug: 'hexagonal-architecture-laravel',
      title: 'Hexagonal Architecture in Laravel',
      excerpt: 'Ports, adapters, and why the HTTP layer is not part of your application.',
      type: 'NOTE',
    },
    {
      slug: 'event-storming-runbook',
      title: 'Event Storming runbook',
      excerpt: 'A reproducible 90-minute workshop format for distributed teams.',
      type: 'NOTE',
    },
    {
      slug: 'aggregate-design-patterns',
      title: 'Aggregate design patterns',
      excerpt: 'When to collapse, when to split, and how to handle eventual consistency.',
      type: 'NOTE',
    },
  ],
  related: [
    {
      slug: 'cqrs-without-event-sourcing',
      title: 'CQRS without event sourcing',
      excerpt: 'Command/query separation at the application layer without the full ES overhead.',
      topic: 'engineering / software',
    },
    {
      slug: 'laravel-service-layer',
      title: 'The Laravel service layer pattern',
      excerpt: 'A pragmatic middle ground between fat controllers and pure domain objects.',
      topic: 'engineering / laravel',
    },
    {
      slug: 'ubiquitous-language-in-practice',
      title: 'Ubiquitous language in practice',
      excerpt: 'How to build a shared vocabulary that survives team turnover.',
      topic: 'engineering / process',
    },
  ],
  references: [
    {
      index: 1,
      label: 'Evans, Eric. Domain-Driven Design: Tackling Complexity in the Heart of Software. Addison-Wesley, 2003.',
      href: 'https://www.domainlanguage.com/ddd/',
    },
    {
      index: 2,
      label: 'Vernon, Vaughn. Implementing Domain-Driven Design. Addison-Wesley, 2013.',
      href: 'https://vaughnvernon.com/',
    },
    {
      index: 3,
      label: 'Millett, Scott & Tune, Nick. Patterns, Principles and Practices of Domain-Driven Design. Wiley, 2015.',
      href: 'https://www.wiley.com/en-us/Patterns%2C+Principles%2C+and+Practices+of+Domain+Driven+Design-p-9781118714706',
    },
    {
      index: 4,
      label: 'Verraes, Mathias. "Modelling by Example." mathiasverraes.net, 2014.',
      href: 'https://mathiasverraes.net/',
    },
  ],
};

// ---------------------------------------------------------------------------
// TOC items (must match h2 ids in bodyHtml)
// ---------------------------------------------------------------------------

const TOC_ITEMS = [
  { id: 'section-01', label: '01 — The setup' },
  { id: 'section-02', label: '02 — Anemic models' },
  { id: 'section-03', label: '03 — Aggregates' },
  { id: 'section-04', label: '04 — Context map' },
  { id: 'section-05', label: '05 — Laravel specifics' },
  { id: 'section-06', label: '06 — What compounds' },
  { id: 'section-07', label: '07 — Trade-offs' },
  { id: 'section-08', label: '08 — Resources' },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function BreadcrumbStrip({ workspace }: { workspace: string }) {
  const crumbs = [
    { label: 'GARDEN', href: `/g/${workspace}/` },
    { label: `@${workspace}`, href: `/g/${workspace}/` },
    { label: 'ENGINEERING', href: undefined },
    { label: 'SOFTWARE', href: undefined },
    { label: MOCK.title.toUpperCase(), href: undefined },
  ];

  return (
    <div className="border-b border-[var(--color-border-hairline)] py-4">
      <div className="mx-auto w-full max-w-[1280px] px-6">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-x-2 gap-y-1"
        >
          {crumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-x-2">
              {i > 0 && (
                <span className="font-mono text-[11px] tracking-wider text-[var(--color-fg-quaternary)]">
                  /
                </span>
              )}
              {crumb.href ? (
                <Link
                  to={crumb.href}
                  className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-fg-tertiary)] hover:text-[var(--color-fg-muted)] no-underline transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  className={
                    i === crumbs.length - 1
                      ? 'font-mono text-[11px] uppercase tracking-wider text-[var(--color-fg)] truncate max-w-[200px] sm:max-w-none'
                      : 'font-mono text-[11px] uppercase tracking-wider text-[var(--color-fg-tertiary)]'
                  }
                >
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}

function ArticleHeader() {
  return (
    <header className="py-24">
      <div className="mx-auto w-full max-w-[760px] px-6">
        {/* Meta line */}
        <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-fg-tertiary)] mb-6">
          Published · {MOCK.publishedAt} · {MOCK.readTime} min read
        </p>

        {/* Title */}
        <h1
          className="text-[var(--color-fg)] font-sans font-bold leading-[1.05] tracking-[-0.02em] mb-6"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
        >
          {MOCK.title}
        </h1>

        {/* Subtitle */}
        <p className="text-[20px] leading-[1.5] text-[var(--color-fg-muted)] mb-10 max-w-[640px]">
          {MOCK.subtitle}
        </p>

        {/* Byline row */}
        <div className="flex flex-wrap items-center gap-3">
          <Avatar initials="VP" size="sm" />
          <span className="text-[14px] text-[var(--color-fg)] font-medium">
            Vincenzo Pirozzi
          </span>
          <span className="text-[var(--color-fg-quaternary)]">·</span>
          <Tag maturity="EVERGREEN" />
          <Tag className="capitalize">engineering</Tag>
          {MOCK.tags.map((tag) => (
            <Chip key={tag} variant="default">
              {tag}
            </Chip>
          ))}
        </div>
      </div>
    </header>
  );
}

function ArticleBody() {
  return (
    <div className="relative mx-auto w-full max-w-[1280px] px-6 pb-24">
      <div className="flex gap-16 items-start">
        {/* Main content */}
        <div className="min-w-0 flex-1">
          {/* TODO: replace dangerouslySetInnerHTML with a proper markdown library (e.g. marked, remark, or @portabletext/react) */}
          <article
            className="prose-pinakes"
            dangerouslySetInnerHTML={{ __html: MOCK.bodyHtml }}
          />

          {/* References */}
          <div className="mt-16 pt-8 border-t border-[var(--color-border-hairline)]">
            <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-fg-tertiary)] mb-4">
              References
            </p>
            <ol className="list-none space-y-0">
              {MOCK.references.map((ref) => (
                <li
                  key={ref.index}
                  className="flex items-start gap-3 py-3 border-b border-[var(--color-border-hairline)] last:border-b-0"
                >
                  <span className="font-mono text-[11px] text-[var(--color-fg-quaternary)] shrink-0 mt-0.5">
                    [{ref.index}]
                  </span>
                  <a
                    href={ref.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] no-underline transition-colors flex items-start gap-1.5 group"
                  >
                    <span>{ref.label}</span>
                    <ArrowUpRight
                      size={12}
                      strokeWidth={1.5}
                      className="shrink-0 mt-0.5 opacity-40 group-hover:opacity-100 transition-opacity"
                    />
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* TOC sidebar — lg+ only */}
        <aside className="hidden lg:block w-[200px] shrink-0">
          <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-fg-quaternary)] mb-3">
            Contents
          </p>
          <TocSidebar items={TOC_ITEMS} />
        </aside>
      </div>
    </div>
  );
}

function BacklinksSection({ workspace }: { workspace: string }) {
  return (
    <section
      id="backlinks"
      className="border-t border-[var(--color-border-hairline)] py-16"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6">
        <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-fg-tertiary)] mb-2">
          Mentioned in
        </p>
        <h3 className="text-[var(--color-fg)] font-bold text-[20px] mb-8">
          {MOCK.backlinks.length} notes link here
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK.backlinks.map((item) => (
            <Link
              key={item.slug}
              to="/g/$workspace/$slug"
              params={{ workspace, slug: item.slug }}
              className="block border border-[var(--color-border-hairline)] bg-[var(--color-surface-1)] p-5 hover:border-[var(--color-border-strong)] transition-colors no-underline group"
            >
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-fg-quaternary)] mb-2">
                {item.type}
              </p>
              <p className="text-[14px] font-semibold text-[var(--color-fg)] leading-snug mb-2 group-hover:text-[var(--color-fg-muted)] transition-colors">
                {item.title}
              </p>
              <p className="text-[13px] text-[var(--color-fg-tertiary)] leading-snug line-clamp-2">
                {item.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedSection({ workspace }: { workspace: string }) {
  return (
    <section
      id="related"
      className="py-16 border-t border-[var(--color-border-hairline)]"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6">
        <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-fg-tertiary)] mb-8">
          Also read
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK.related.map((item) => (
            <Link
              key={item.slug}
              to="/g/$workspace/$slug"
              params={{ workspace, slug: item.slug }}
              className="flex flex-col border border-[var(--color-border-hairline)] p-5 hover:border-[var(--color-border-strong)] transition-colors no-underline group"
            >
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-fg-quaternary)] mb-2">
                {item.topic}
              </p>
              <p className="text-[15px] font-semibold text-[var(--color-fg)] leading-snug mb-2">
                {item.title}
              </p>
              <p className="text-[13px] text-[var(--color-fg-tertiary)] leading-snug line-clamp-2 flex-1">
                {item.excerpt}
              </p>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-fg-tertiary)] group-hover:text-[var(--color-fg-muted)] transition-colors mt-4 self-end">
                Read &rsaquo;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function EndDivider({ workspace }: { workspace: string }) {
  return (
    <div className="border-t border-[var(--color-border-hairline)] py-10">
      <div className="mx-auto w-full max-w-[1280px] px-6 flex flex-wrap items-center justify-between gap-4">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-mono text-[12px] uppercase tracking-wider text-[var(--color-fg-tertiary)] hover:text-[var(--color-fg-muted)] no-underline transition-colors"
        >
          Up — Back to top
        </a>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-fg-quaternary)]">
            Share
          </span>
          <button
            type="button"
            onClick={() => {
              void navigator.clipboard.writeText(window.location.href);
            }}
            className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-fg-tertiary)] hover:text-[var(--color-fg-muted)] transition-colors bg-transparent border-none cursor-pointer p-0"
          >
            Copy link
          </button>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(MOCK.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-fg-tertiary)] hover:text-[var(--color-fg-muted)] no-underline transition-colors"
          >
            Discuss on Twitter
          </a>
        </div>
        <Link
          to="/g/$workspace/"
          params={{ workspace }}
          className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-fg-tertiary)] hover:text-[var(--color-fg-muted)] no-underline transition-colors"
        >
          &lsaquo; Back to garden
        </Link>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page root
// ---------------------------------------------------------------------------

function PublicContentView() {
  const { workspace } = Route.useParams();

  return (
    <PublicLayout>
      {/* 1. Breadcrumb strip */}
      <BreadcrumbStrip workspace={workspace} />

      {/* 2. Article header band */}
      <ArticleHeader />

      {/* 3 + 4. Body + TOC sidebar */}
      <ArticleBody />

      {/* 5. References — rendered inside ArticleBody above the backlinks */}

      {/* 6. Backlinks */}
      <BacklinksSection workspace={workspace} />

      {/* 7. Related content */}
      <RelatedSection workspace={workspace} />

      {/* 8. End divider footer */}
      <EndDivider workspace={workspace} />
    </PublicLayout>
  );
}
