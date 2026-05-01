---
version: "4.0"
status: active
dialect: Buzzvil :design
supersedes: "v3.0 BMW corporate (REJECTED)"
created: 2026-05-01
---

# Pinakes — Design Specification v4.0

## Mantra

Editorial dark playbook. Type-driven, grid-as-decoration, zero ornament.
The canvas is near-black. Type does the heavy lifting. Cards are surface lifts,
never shadows. The only "color" in the system is white — used sparingly as a pill
CTA. Everything else is a grey value. Decoration lives in the grid infrastructure:
coordinate ticks, 12-col hairline guides, a floating TOC. The dialect is Buzzvil
:design (design.buzzvil.com). Nothing kitsch. Nothing corporate-SaaS. Nothing light.

---

## Color Tokens

All tokens are neutrals. No hue accent. The sole "accent" is `#ffffff` used only
for the primary pill button background.

### CSS Custom Properties

```css
:root {
  /* Surfaces */
  --canvas:       #0a0a0a;   /* page background — near-black, NOT pure black */
  --surface-1:    #0f0f10;   /* card default */
  --surface-2:    #161617;   /* hover state, chip background */
  --surface-3:    #1f1f20;   /* elevated panel, modal */

  /* Borders */
  --border-hairline: rgba(255, 255, 255, 0.06);  /* default card border */
  --border-strong:   rgba(255, 255, 255, 0.12);  /* hover, focus ring */

  /* Text */
  --text-primary:    #fafafa;  /* headings, high-emphasis */
  --text-secondary:  #a0a0a0;  /* body copy */
  --text-tertiary:   #6b6b6b;  /* meta, timestamps */
  --text-quaternary: #404040;  /* decorative: coordinate ticks, grid labels */

  /* Semantic — minimal */
  --color-success: #4ade80;
  --color-warning: #facc15;
  --color-error:   #f87171;

  /* Maturity states — Pinakes-specific */
  --maturity-seedling:  #facc15;  /* yellow */
  --maturity-budding:   #a0a0a0;  /* grey */
  --maturity-evergreen: #4ade80;  /* green */
  --maturity-archived:  #404040;  /* dim */
}
```

### Pill Button — the only "color"

```
ButtonPrimary:   bg #ffffff  /  text #0a0a0a  /  hover bg #e5e5e5
ButtonSecondary: bg --surface-2  /  text --text-primary  /  border --border-hairline
```

No blue. No brand hue. The white pill on a near-black surface is the entire
accent vocabulary.

---

## Typography

### Font Stack

```css
--font-display: 'Inter', system-ui, -apple-system, sans-serif;
--font-body:    'Inter', system-ui, -apple-system, sans-serif;
--font-mono:    'JetBrains Mono', 'Fira Code', monospace;
```

Load Inter as a variable font (`wght` axis 100-900) from Google Fonts or
self-hosted. JetBrains Mono for all mono contexts (stats, microcopy, ticks).

### Scale

| Role              | Size (px / rem)    | Weight | Tracking   | Leading | Font           |
|-------------------|--------------------|--------|------------|---------|----------------|
| Hero display      | 72–88 / 4.5–5.5rem | 700    | -0.04em    | 1.0     | Inter          |
| H1 page title     | 44–56 / 2.75–3.5rem| 700    | -0.02em    | 1.05    | Inter          |
| H2 section head   | 32–40 / 2–2.5rem   | 700    | -0.015em   | 1.1     | Inter          |
| H3 card title     | 22–26 / 1.375rem   | 600    | -0.01em    | 1.25    | Inter          |
| Body              | 15–16 / 1rem       | 400    | 0          | 1.55    | Inter          |
| Body small        | 14 / 0.875rem      | 400    | 0          | 1.55    | Inter          |
| Meta / stat value | 12–13 / 0.8rem     | 400    | 0          | 1.4     | JetBrains Mono |
| Microcopy         | 11 / 0.6875rem     | 400    | 0.08em     | 1.3     | JetBrains Mono |
| Nav item          | 14 / 0.875rem      | 400    | 0.01em     | 1.4     | Inter          |
| Button label      | 14 / 0.875rem      | 600    | 0.02em     | 1.0     | Inter          |
| Chip label        | 11 / 0.6875rem     | 500    | 0.06em     | 1.0     | Inter          |

### Microcopy conventions

Microcopy (coordinate ticks, breakpoint indicator, stat subtitles) uses JetBrains
Mono at 11px, `--text-quaternary`, UPPERCASE, tracking 0.08em. Examples:
`"0  8"`, `"xs · sm"`, `"PRs merged this quarter"`.

### Voice and headline case

Lowercase is valid and preferred for section titles ("the shift", "our thesis",
"working principles"). No forced title-case. Short, declarative sentences.
Zero corporate speak. Periods at the end of card titles are intentional — they
signal completion, not incompleteness.

---

## Spacing

| Token            | Value    | Usage                              |
|------------------|----------|------------------------------------|
| `--section-y`    | 120–160px| Vertical padding for full sections |
| `--card-pad`     | 28–32px  | Internal card padding              |
| `--container-w`  | 1200px   | Max content width                  |
| `--gap`          | 24px     | Default grid gap                   |
| `--gap-sm`       | 16px     | Compact grids (chips, tags)        |
| `--gap-lg`       | 40px     | Wide two-col layouts               |

Container is centered with `margin: 0 auto` and horizontal padding of 24px.
On hero sections the container can span to 1440px max.

---

## Border Radius

```
Cards:        12px   (--radius-card)
Buttons pill: 9999px (--radius-pill)
Chips:        6–8px  (--radius-chip)
Inputs:       6px    (--radius-input)
Stat boxes:   12px   (--radius-card)
```

No sharp-corner (0px) mode. The Buzzvil dialect uses subtle rounding everywhere
except the TOC sidebar which is flush with the viewport edge.

---

## Shadows

**None.** The near-black canvas makes drop shadows invisible and artificial.
Depth is expressed exclusively through:

- Surface lift: `--canvas` < `--surface-1` < `--surface-2` < `--surface-3`
- Hairline borders: `--border-hairline` at rest, `--border-strong` on hover/focus
- Whitespace separation between sections

---

## Decorative Signature

These four elements define the Buzzvil dialect. They must be present on every
full-page layout. They are purely visual infrastructure — never convey information.

### 1. Vertical grid guides

12 vertical lines spanning the full viewport height, aligned to the 12-column
grid. Rendered as `position: fixed` or `position: absolute` `<div>` elements,
each `1px` wide, `background: rgba(255,255,255,0.05)` (between `--border-hairline`
and fully invisible). They appear on desktop only (`lg` breakpoint and up).

```tsx
/* GridGuides.tsx — simplified */
export function GridGuides() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div className="mx-auto max-w-[1200px] h-full grid grid-cols-12 gap-6 px-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-r border-white/[0.05]" />
        ))}
      </div>
    </div>
  );
}
```

### 2. Coordinate ticks

A horizontal tick rule at the very top of the page showing column positions as
numbers in mono font. Reference: `"0  8"` at top-left.
Color: `--text-quaternary`. Font: JetBrains Mono 11px. Position: fixed top-0,
above the nav.

```tsx
/* CoordinateTicks.tsx */
export function CoordinateTicks() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 right-0 z-50
                 flex items-center h-[18px] px-6"
    >
      <span className="font-mono text-[11px] text-[--text-quaternary] tracking-[0.08em]">
        0&nbsp;&nbsp;8
      </span>
    </div>
  );
}
```

### 3. Breakpoint indicator

Bottom-left of the viewport, fixed position, showing the active Tailwind
breakpoint in mono microcopy. Visible only in development (`NODE_ENV !== 'production'`
or behind a feature flag).

```tsx
/* BreakpointIndicator.tsx */
export function BreakpointIndicator() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-2 left-4 z-50 font-mono
                 text-[11px] text-[--text-quaternary] tracking-[0.08em]"
    >
      <span className="sm:hidden">xs</span>
      <span className="hidden sm:inline md:hidden">sm</span>
      <span className="hidden md:inline lg:hidden">md</span>
      <span className="hidden lg:inline xl:hidden">lg</span>
      <span className="hidden xl:inline">xl</span>
    </div>
  );
}
```

### 4. Right-side sticky TOC

A floating sidebar anchored to the right edge of the viewport, visible from
`lg` breakpoint upward. Renders a list of section anchors. The active section
receives a filled `4px` square dot prefix and slightly brighter text.

```tsx
/* TocSidebar.tsx */
interface TocItem { id: string; label: string; }

export function TocSidebar({ items, activeId }: { items: TocItem[]; activeId: string }) {
  return (
    <aside
      className="hidden lg:flex flex-col gap-1 fixed right-6 top-1/3
                 border-l border-[--border-hairline] pl-4 z-30"
      aria-label="Table of contents"
    >
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`flex items-center gap-2 text-[13px] no-underline transition-colors
              ${isActive
                ? 'text-[--text-primary]'
                : 'text-[--text-tertiary] hover:text-[--text-secondary]'
              }`}
          >
            <span
              className={`w-1 h-1 shrink-0 rounded-none
                ${isActive ? 'bg-[--text-primary]' : 'bg-transparent'}`}
            />
            {item.label}
          </a>
        );
      })}
    </aside>
  );
}
```

---

## Nav Top Chip

The center-nav pill chip (e.g. "AI-Native Playbook v.1") is a white-background
pill with `#0a0a0a` text, `border-radius: 9999px`, padding `6px 14px`,
font-size 13px, weight 500. It is distinct from the nav links which are plain
text. On Pinakes, the equivalent chip reads the current version or active context
(e.g. "Knowledge Garden v.1").

```tsx
export function NavChip({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-white text-[#0a0a0a] text-[13px]
                     font-medium px-3.5 py-1.5 leading-none select-none">
      {label}
    </span>
  );
}
```

---

## Component Inventory

### Atoms

| Component         | Description                                                        |
|-------------------|--------------------------------------------------------------------|
| `ButtonPrimary`   | Pill, bg `#ffffff`, text `#0a0a0a`, hover bg `#e5e5e5`            |
| `ButtonSecondary` | Pill, bg `--surface-2`, text `--text-primary`, border hairline    |
| `Chip`            | Small pill, bg `--surface-2`, 6-8px radius, 11px Inter 500        |
| `Tag`             | Maturity tag — square corners, border in maturity color           |
| `Input`           | bg `--surface-1`, border hairline, radius 6px, focus border-strong|
| `NavChip`         | Center nav white pill (version badge)                             |

### Molecules

| Component               | Description                                                   |
|-------------------------|---------------------------------------------------------------|
| `Card`                  | bg `--surface-1`, border `--border-hairline`, radius 12px, pad 28–32px |
| `StatCard`              | Large mono number + descriptor. bg `--surface-1`, no footer  |
| `NoteCard`              | Cover image strip + body: Tag + title + excerpt + link        |
| `FurtherReadingCard`    | Title + excerpt + optional lock icon + access-required label  |
| `WorkingPrinciplesTable`| 3-col table: Principle / Alignment Question / Description     |

### Organisms

| Component             | Description                                                       |
|-----------------------|-------------------------------------------------------------------|
| `Header`              | Sticky, `--canvas` bg, logo left / NavChip + links center / CTA right |
| `Footer`              | 4-col editorial: brand + 3 link columns + bottom copyright bar   |
| `TocSidebar`          | Right-edge sticky TOC with filled-dot active state               |
| `GridGuides`          | 12-col hairline overlay, fixed, pointer-events-none              |
| `CoordinateTicks`     | Top fixed rule, mono labels                                       |
| `BreakpointIndicator` | Bottom-left fixed, dev-only                                       |

---

## Page Archetypes

### Home — 5-band playbook

```
Band 1 — HERO (full viewport height optional)
  canvas bg / hero display type centered or left-aligned /
  2 buttons: ButtonPrimary (pill white) + ButtonSecondary (pill ghost)

Band 2 — CONTENT GRID
  section label (microcopy) + H2 + 4-col NoteCard grid

Band 3 — TAXONOMY GRID
  section label + H2 + 6-col TopicChip grid

Band 4 — MANIFESTO / THESIS
  surface-1 bg / centered narrow column / prose body text

Band 5 — CTA pre-footer
  canvas bg / centered H2 + body + single ButtonSecondary
```

### Login — centered minimal

```
Viewport-centered card on --canvas bg
  Logo + app name
  Input (email) + Input (password)
  ButtonPrimary (full-width pill)
  No nav, no footer decorations
```

### Garden index — dark grid of NoteCards

```
Sticky Header
GridGuides + CoordinateTicks + TocSidebar (if categories)
Full-width canvas bg
  Filter chips row (Chip components, category/maturity)
  Responsive grid: 1-col mobile / 2-col md / 3-col lg / 4-col xl
  NoteCards with maturity Tag
Pagination: text links, no heavy UI
Footer
```

### Single content — centered article

```
Sticky Header
TocSidebar (h2/h3 anchors)
max-w-[720px] centered, canvas bg
  Tag + title (H1, 44-56px) + meta (date, maturity, read time)
  prose-pinakes body
  Further reading: FurtherReadingCard grid
Footer
```

### Dashboard — stats grid + recent

```
App Header (variant="app")
  Section: 5-col StatCard row
  Section: H3 + 4-col recent NoteCard grid
  Section: WorkingPrinciplesTable (optional, config display)
No public Footer — minimal bottom nav only
```

---

## Tailwind v4 Token Mapping

```css
/* globals.css — @theme block (Tailwind v4) */
@theme {
  /* Colors */
  --color-canvas:      #0a0a0a;
  --color-surface-1:   #0f0f10;
  --color-surface-2:   #161617;
  --color-surface-3:   #1f1f20;

  --color-border-hairline: rgba(255,255,255,0.06);
  --color-border-strong:   rgba(255,255,255,0.12);

  --color-text-primary:    #fafafa;
  --color-text-secondary:  #a0a0a0;
  --color-text-tertiary:   #6b6b6b;
  --color-text-quaternary: #404040;

  --color-pill-bg:   #ffffff;
  --color-pill-text: #0a0a0a;

  /* Fonts */
  --font-display: 'Inter', system-ui, sans-serif;
  --font-body:    'Inter', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', monospace;

  /* Radius */
  --radius-card:  12px;
  --radius-pill:  9999px;
  --radius-chip:  7px;
  --radius-input: 6px;

  /* Layout */
  --container-max:  1200px;
  --container-wide: 1440px;
  --section-y:      140px;
  --card-pad:       30px;
  --gap-default:    24px;
  --toc-width:      180px;
}
```

### Utility name conventions

| Token purpose      | Tailwind class (v4)                          |
|--------------------|----------------------------------------------|
| Canvas bg          | `bg-[--color-canvas]`                        |
| Surface-1 card     | `bg-[--color-surface-1]`                     |
| Surface-2 hover    | `bg-[--color-surface-2]`                     |
| Hairline border    | `border border-[--color-border-hairline]`    |
| Strong border      | `border border-[--color-border-strong]`      |
| Primary text       | `text-[--color-text-primary]`                |
| Secondary text     | `text-[--color-text-secondary]`              |
| Tertiary text      | `text-[--color-text-tertiary]`               |
| Quaternary text    | `text-[--color-text-quaternary]`             |
| Pill bg            | `bg-[--color-pill-bg]`                       |
| Pill text          | `text-[--color-pill-text]`                   |
| Mono font          | `font-mono`                                  |
| Card radius        | `rounded-[12px]`                             |
| Pill radius        | `rounded-full`                               |

---

## Iconography

Library: `lucide-react`, outline style only.
Stroke width: `1.5px` (Lucide default — do not override to 2px).
Size: 16px for inline / 20px for standalone actions / 24px for section icons.
Color: inherits from parent text color via `currentColor`.

No emoji. Ever. Not in labels, not in descriptions, not in footer copy.

---

## Accessibility

- Minimum contrast ratio: 4.5:1 for body text (`--text-secondary` `#a0a0a0` on
  `--canvas` `#0a0a0a` = 6.3:1, passes AA).
- `--text-tertiary` `#6b6b6b` on `--canvas` = 3.4:1 — acceptable for non-critical
  meta, caution for body copy.
- All decorative elements (`GridGuides`, `CoordinateTicks`, `BreakpointIndicator`)
  carry `aria-hidden="true"`.
- `TocSidebar` has `aria-label="Table of contents"`.
- Focus rings: `2px solid rgba(255,255,255,0.6)` with `outline-offset: 2px`.
- `prefers-reduced-motion`: collapse all transitions and animations to `0ms`.
- Skip link (`#main-content`) present on all page layouts.
- WCAG 2.1 AA target.

---

## Motion

Minimal. Near-black UIs feel heavier when over-animated.

| Context              | Duration | Easing                       |
|----------------------|----------|------------------------------|
| Button hover state   | 120ms    | `ease-out`                   |
| Card border hover    | 120ms    | `ease-out`                   |
| TOC active dot       | 150ms    | `ease-out`                   |
| Page entrance fade   | 200ms    | `cubic-bezier(0,0,0.2,1)`    |
| Slide-up entrance    | 220ms    | `cubic-bezier(0,0,0.2,1)`    |
| Modal / panel open   | 280ms    | `cubic-bezier(0.16,1,0.3,1)` |

No bounce. No spring on UI chrome. Spring only on interactive draggable elements.

---

## Rejected Dialects — Do Not Revert

The following directions were explored and explicitly rejected. Do not re-introduce them.

| Version | Dialect         | Reason for rejection                                   |
|---------|-----------------|--------------------------------------------------------|
| v1.0    | Papyrus / ochre | Kitsch, historical-costume feel, not contemporary      |
| v2.0    | Cobalt egeo     | Saturated-SaaS blue, tech-bro aesthetic, wrong mood    |
| v3.0    | BMW corporate   | Light canvas + single blue = enterprise dashboard;     |
|         |                 | rejected by owner as "not the vibe"                    |

v4.0 Buzzvil dialect is the canonical direction until explicitly superseded.

---

## Migration Notes from v3.0

The existing `globals.css` uses the BMW light-canvas token set
(`--color-canvas: #ffffff`, `--color-primary: #1c69d4`, `--color-surface-dark:
#1a2129`). These must be replaced wholesale.

Key changes required:

- `--color-canvas` from `#ffffff` to `#0a0a0a`
- `--color-primary` and `--color-primary-active` **removed** — replaced by the
  white pill pattern
- `--color-surface-dark` becomes the default canvas, not an accent band
- `--color-surface-soft` becomes `--surface-2` (`#161617`)
- All `--color-hairline` tokens shift from light (`#e6e6e6`) to dark
  (`rgba(255,255,255,0.06)`)
- `Header.tsx`: bg `--canvas`, active nav link `--text-primary` (not blue),
  login CTA becomes white pill
- `Footer.tsx`: bg `--canvas` with top hairline, 4-col editorial layout,
  social icon row as surface-2 square buttons
- `NoteCard`: bg `--surface-1`, radius 12px, title `--text-primary`,
  body `--text-secondary`

---

*Pinakes DESIGN.md v4.0 — Buzzvil :design dialect — 2026-05-01*
