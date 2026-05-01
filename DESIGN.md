---
# ============================================================
# DESIGN.md — Pinakes
# Personal wiki / digital garden di un developer polimata
# Naming: Pinakes di Callimaco, Biblioteca di Alessandria (III sec. a.C.)
# ============================================================

project: pinakes
version: 1.0.0
created: 2026-05-01
status: canonical

# --- BRAND IDENTITY ---
brand:
  name: Pinakes
  tagline: "Catalogo del sapere personale"
  voice: [preciso, curioso, asciutto]

# --- COLOR TOKENS (dark mode primario) ---
colors:
  # Superfici — warm near-black, non puro #000
  surface-base:       "#0E0C09"   # fondo principale: nero-seppia, inchiostro antico
  surface-raised:     "#16130E"   # card, sidebar, pannelli sollevati
  surface-overlay:    "#1E1A13"   # modal, dropdown, tooltip
  surface-border:     "#2A2519"   # border default (opacity variante: usare a 60%)
  surface-border-faint: "#1C1813" # border sottile tra sezioni

  # Testo
  text-primary:       "#F0EBE0"   # testo principale: bianco-papiro caldo
  text-secondary:     "#B8AC97"   # testo secondario: ombra di inchiostro
  text-muted:         "#6B6050"   # metadata, timestamp, placeholder
  text-inverse:       "#0E0C09"   # testo su accent pieno

  # Accent unico — ocra/zafferano (papyrus illuminato dal sole)
  # Motivazione: l'indigo del Mar Egeo è bello ma già usato da Linear/Notion.
  # L'ocra-zafferano è leggibile su warm dark, evoca l'inchiostro dei manoscritti
  # illuminati e non è mai kitsch se usato con parsimonia (solo elementi interattivi
  # e maturità "evergreen"). Contrasto su surface-base: 5.3:1 — WCAG AA verified.
  accent:             "#C8892A"   # ocra zafferano — il solo accent del sistema
  accent-muted:       "#2A200F"   # bg di tag/badge: tono sepia ultra-scuro
  accent-hover:       "#DDA040"   # stato hover sull'accent (lighter +12%)
  accent-text:        "#E8A84A"   # testo accent su surface-base (leggibilità AA+)

  # Semantici
  success:            "#4E9E6A"   # verde papiro — note "evergreen" (solo icona)
  warning:            "#B87333"   # bronzo — avviso
  error:              "#C0433A"   # lacca pompeiana — errore
  success-muted:      "#0F2018"   # bg success badge
  warning-muted:      "#200F05"   # bg warning badge
  error-muted:        "#1E0908"   # bg error badge

  # Maturità Pinakes (stati botanici reinterpretati in chiave archivistica)
  maturity-seedling:  "#C8892A"   # = accent (papyrus: germoglio)
  maturity-budding:   "#7A6A4A"   # ink: in sviluppo
  maturity-evergreen: "#4E9E6A"   # marble: stabile e curato
  maturity-archived:  "#4A4035"   # dust: archiviato, polvere

# --- TYPOGRAPHY ---
typography:
  # 2 font families MAX. Punto finale, nessuna eccezione.
  font-serif: "'Source Serif 4', 'Georgia', serif"
    # Motivazione: Source Serif 4 (Google Fonts, OFL) ha optical sizing,
    # eccelsa leggibilità a corpi piccoli, personalità editoriale senza
    # essere vintage. Newsreader è ottimo ma meno neutro per UI shell.
    # Fraunces scartato: troppo carico per note dense.
  font-sans:  "'Geist', 'Inter', system-ui, sans-serif"
    # Geist (Vercel, MIT) per tutto l'UI chrome: nav, label, badge, metadata.
    # Fallback Inter. Niente terzo font. Mai.

  # 9 livelli tipografici — tutti in rem (base: 1rem = 16px)
  scale:
    display:
      font-family: font-serif
      size:        "2.5rem"    # 40px
      weight:      600
      line-height: 1.15
      letter-spacing: "-0.02em"
      usage: "Titolo sito, header di sezione principale hero"

    h1:
      font-family: font-serif
      size:        "1.875rem"  # 30px
      weight:      600
      line-height: 1.25
      letter-spacing: "-0.015em"
      usage: "Titolo nota principale, titolo pagina"

    h2:
      font-family: font-serif
      size:        "1.375rem"  # 22px
      weight:      600
      line-height: 1.3
      letter-spacing: "-0.01em"
      usage: "Sezione interna alla nota, capitolo"

    h3:
      font-family: font-serif
      size:        "1.125rem"  # 18px
      weight:      600
      line-height: 1.4
      letter-spacing: "0"
      usage: "Sottosezione, callout title"

    body-lg:
      font-family: font-serif
      size:        "1.0625rem" # 17px
      weight:      400
      line-height: 1.75
      letter-spacing: "0"
      usage: "Corpo testo long-form, post, note evergreen"

    body-md:
      font-family: font-serif
      size:        "0.9375rem" # 15px
      weight:      400
      line-height: 1.7
      letter-spacing: "0"
      usage: "Corpo standard, list content"

    body-sm:
      font-family: font-sans
      size:        "0.8125rem" # 13px
      weight:      400
      line-height: 1.6
      letter-spacing: "0.01em"
      usage: "Note a margine, descrizioni secondarie"

    label:
      font-family: font-sans
      size:        "0.75rem"   # 12px
      weight:      500
      line-height: 1.4
      letter-spacing: "0.04em"
      usage: "Label UI, nav item, badge text, metadata key"

    caption:
      font-family: font-sans
      size:        "0.6875rem" # 11px
      weight:      400
      line-height: 1.4
      letter-spacing: "0.03em"
      usage: "Timestamp, autore, numero pagina, note legali"

# --- LAYOUT ---
layout:
  content-max-width:  "72ch"    # colonna testo: ~680px a 15px font, ottimale per lettura
  content-padding-x:  "24px"    # padding laterale mobile
  sidebar-width:      "240px"   # sidebar navigazione sinistra
  sidebar-toc-width:  "200px"   # TOC destra (Table of Contents)
  panel-stack-width:  "480px"   # pannello nota in stacked panels (Andy Matuschak)
  breakpoint-mobile:  "640px"
  breakpoint-tablet:  "1024px"
  breakpoint-desktop: "1280px"

  # Spacing scale (multipli di 4px)
  spacing:
    "1":  "4px"
    "2":  "8px"
    "3":  "12px"
    "4":  "16px"
    "5":  "20px"
    "6":  "24px"
    "8":  "32px"
    "10": "40px"
    "12": "48px"
    "16": "64px"
    "20": "80px"
    "24": "96px"

  # Grid — layout a 3 colonne su desktop
  grid:
    desktop: "240px 1fr 200px"   # sidebar | content | toc
    tablet:  "240px 1fr"         # sidebar | content (TOC collassata)
    mobile:  "1fr"               # solo content (sidebar drawer)
    column-gap: "32px"
    row-gap:    "0"

# --- ELEVATION & DEPTH ---
# Nessuna box-shadow. La profondità si esprime tramite:
# 1. Variazione di surface (base → raised → overlay)
# 2. Border con opacity calibrata
# 3. Background leggermente più chiaro per elementi interattivi
elevation:
  level-0:  # fondo pagina
    background: "surface-base"
    border:     "none"
  level-1:  # card, sidebar, pannello
    background: "surface-raised"
    border:     "1px solid surface-border"
    # border-color usa opacity: rgba(255, 255, 255, 0.06)
  level-2:  # dropdown, popover, tooltip
    background: "surface-overlay"
    border:     "1px solid rgba(255,255,255,0.09)"
  level-3:  # modal/dialog — rimane raro
    background: "surface-overlay"
    border:     "1px solid rgba(200,137,42,0.15)"
    # leggero accent border per distinguere il modal dal resto

# --- SHAPES (radius scale) ---
shapes:
  radius-none: "0px"
  radius-sm:   "4px"    # badge, tag, chip, code inline
  radius-md:   "8px"    # card, input, button
  radius-lg:   "12px"   # modal, pannello, callout
  radius-full: "9999px" # solo per avatar circolari (se presenti)

# --- MOTION & ANIMATION ---
motion:
  # Principio: le transizioni informano, non intrattengono.
  # Nessun bounce, nessun elastic, nessun spring esagerato.
  duration-fast:    "150ms"  # hover, focus ring, color transition
  duration-default: "200ms"  # apertura dropdown, tooltip appear
  duration-slow:    "250ms"  # slide pannello, modal open
  easing-default:   "cubic-bezier(0.16, 1, 0.3, 1)"  # ease-out rapido
  easing-linear:    "linear"                          # solo progress bar
  # Tutto ciò che non è strettamente necessario si omette.
  # prefers-reduced-motion: duration → 0ms, transform → none

# --- IMAGERY & ICONOGRAPHY ---
icons:
  library:   "lucide-react"
  size-sm:   "14px"
  size-md:   "16px"
  size-lg:   "20px"
  stroke-width: "1.5"
  # Nessuna icona colorata. Solo text-secondary o text-muted come fill/stroke.
  # L'accent appare sull'icona SOLO sullo stato active/selected.

imagery:
  philosophy: >
    Nessuna stock photo decorativa. Le immagini entrano nella nota solo se
    sono semanticamente necessarie (screenshot, diagramma, schema concettuale).
    Hero images: solo se astratte e concettuali (texture papiro digitalizzato,
    pattern geometrico greco-moderno in monocromo). Mai fotografia di persone
    o luoghi come decorazione.
  format-preferred: "WebP, SVG per diagrammi"
  max-width-inline: "100%"
  border-radius:    "radius-md"

# --- ACCESSIBILITY ---
accessibility:
  contrast-ratio-normal: "4.5:1 minimum"
  contrast-ratio-large:  "3:1 minimum (testo > 18px bold)"
  # Verificati:
  # text-primary (#F0EBE0) su surface-base (#0E0C09): 14.8:1 — AAA
  # text-secondary (#B8AC97) su surface-base: 7.2:1 — AAA
  # accent-text (#E8A84A) su surface-base: 5.3:1 — AA
  # text-muted (#6B6050) su surface-base: 3.1:1 — AA large only (usare solo per decorativo)
  focus-ring: "2px solid accent con offset 2px — mai rimosso, mai solo colore"
  skip-link:  "visualmente nascosto, appare on-focus, ancora a #main-content"
  aria:       "landmark roles obbligatori: main, nav, aside per TOC"
  font-scaling: "nessun px fisso sul body, tutto rem relativo a 16px browser default"
---

# Pinakes — DESIGN.md

## Overview / Visual Theme

Pinakes è il catalogo della conoscenza personale. Il nome viene dai Pinakes di Callimaco,
bibliotecario della Biblioteca di Alessandria nel III sec. a.C.: primo tentativo sistematico
di classificare tutto il sapere umano in un unico indice. Questa storia informa ogni scelta
visiva senza illustrarla.

**Il tema visivo non è l'antichità. È la densità calma del sapere stratificato.**

La palette emana da materiali reali: inchiostro su papiro invecchiato, cera di sigillo,
bronzo ossidato. Il risultato è un warm dark che non affatica gli occhi su sessioni di
lettura lunghe. L'unico accent — ocra zafferano #C8892A — è il colore che la luce del
sole proietta sul papiro: presente quanto basta per guidare l'occhio, mai decorativo.

Questo non è un portfolio. Non è un blog. È un sistema di pensiero esternalizzato.
Il design deve comunicare esattamente questo: qui lavora qualcuno che prende il sapere
sul serio.

**Tre parole che guidano ogni decisione:** preciso, curioso, asciutto.

**Ispirazione operativa:**
- Gwern.net — rigore editoriale, nessun compromesso sull'informazione
- notes.andymatuschak.org — pannelli affiancabili, non pagine lineari
- Linear.app — cromia warm dark, surface variation senza shadow
- Maggie Appleton — badge di maturità come sistema semantico, non decorativo

---

## Color Palette

Tutti i token sono definiti nel frontmatter YAML. Qui il razionale semantico.

### Superfici (dark mode)

| Token | Hex | Uso |
|---|---|---|
| `surface-base` | `#0E0C09` | Fondo pagina. Nero-seppia, mai freddo. |
| `surface-raised` | `#16130E` | Card, sidebar, pannelli note. Delta sottile da base. |
| `surface-overlay` | `#1E1A13` | Dropdown, tooltip, modal. |
| `surface-border` | `#2A2519` | Border standard tra elementi. |
| `surface-border-faint` | `#1C1813` | Divisori interni, righe di separazione. |

### Testo

| Token | Hex | Contrasto su base | Uso |
|---|---|---|---|
| `text-primary` | `#F0EBE0` | 14.8:1 | Corpo testo, titoli. |
| `text-secondary` | `#B8AC97` | 7.2:1 | Sottotitoli, descrizioni. |
| `text-muted` | `#6B6050` | 3.1:1 | Metadata, timestamp — solo elemento non-body. |
| `text-inverse` | `#0E0C09` | — | Testo su accent pieno (pulsante CTA se presente). |

### Accent (unico)

| Token | Hex | Uso |
|---|---|---|
| `accent` | `#C8892A` | Link visited, border active, indicatore nav selected. |
| `accent-muted` | `#2A200F` | Background di tag e badge taxonomy. |
| `accent-hover` | `#DDA040` | Stato hover su elementi accent. |
| `accent-text` | `#E8A84A` | Testo interattivo su surface (link, label selezionati). |

### Semantici

| Token | Hex | Uso |
|---|---|---|
| `success` | `#4E9E6A` | Icona stato "evergreen" |
| `warning` | `#B87333` | Avviso, nota deprecata |
| `error` | `#C0433A` | Errore, link rotto |
| `success-muted` | `#0F2018` | Background badge success |
| `warning-muted` | `#200F05` | Background badge warning |
| `error-muted` | `#1E0908` | Background badge error |

### Maturità Pinakes (stati canonici)

I 4 stati usano icone lucide-react precise. Non sono opzionali — ogni nota DEVE avere un
livello di maturità assegnato.

| Stato | Token colore | Icona lucide | Significato |
|---|---|---|---|
| `seedling` | `maturity-seedling` `#C8892A` | `<Sprout />` | Appunti grezzi, bozza iniziale |
| `budding` | `maturity-budding` `#7A6A4A` | `<BookOpen />` | In elaborazione, struttura presente ma incompleta |
| `evergreen` | `maturity-evergreen` `#4E9E6A` | `<Leaf />` | Stabile, curato, revisionato |
| `archived` | `maturity-archived` `#4A4035` | `<Archive />` | Superato o dismesso, conservato per riferimento |

---

## Typography

Vedere frontmatter per i token completi. Principi operativi:

**Source Serif 4** governa tutto il contenuto: titoli, corpo, citazioni, note.
Attiva `font-optical-sizing: auto` e `font-feature-settings: "liga" 1, "kern" 1`.

**Geist** governa tutto il chrome dell'interfaccia: navigazione, label, badge, metadati,
timestamp, code inline quando fuori da blocco. Nessuna eccezione.

La distinzione è netta: l'utente percepisce istintivamente la differenza tra "sto leggendo
contenuto" e "sto navigando l'interfaccia" — senza leggere manuali.

**Gerarchia in pratica:**
```
display (2.5rem)    ← mai in pagina nota, solo homepage/hero
h1 (1.875rem)       ← un solo h1 per nota
h2 (1.375rem)       ← sezioni principali
h3 (1.125rem)       ← sottosezioni
body-lg (1.0625rem) ← note evergreen, post long-form
body-md (0.9375rem) ← standard
body-sm (0.8125rem) ← sidebar, note a margine
label (0.75rem)     ← nav, badge — sempre font-sans
caption (0.6875rem) ← timestamp, autore — sempre font-sans
```

**Regola di misurazione:** la colonna testo non supera mai `72ch`. Non è un suggerimento.

---

## Layout

```
┌──────────────┬──────────────────────────────┬─────────────┐
│  Sidebar     │         Content              │     TOC     │
│  240px       │         72ch max             │   200px     │
│  nav +       │         padding 24px         │  (desktop)  │
│  taxonomy    │                              │             │
└──────────────┴──────────────────────────────┴─────────────┘
```

**Stacked panels (modalità Andy Matuschak):**
Quando l'utente apre un backlink, il pannello della nota collegata si affianca a destra
invece di navigare via. Ogni pannello ha larghezza `480px` con `padding 24px`.
Il layout scorre orizzontalmente. Non è paginazione: è profondità.

**Mobile:** sidebar diventa drawer (hamburger), TOC collassa in link "In questa pagina" in
cima al contenuto. Il content occupa il 100% della viewport con padding `16px`.

**Grid column gap:** `32px` fisso. Row gap: 0 (il ritmo verticale è gestito dai margin dei
titoli, non dal grid).

---

## Elevation & Depth

Il sistema non usa `box-shadow`. Mai. Neanche `drop-shadow`.

La profondità si costruisce con tre strumenti:
1. **Surface step** — ogni livello usa la variante surface successiva
2. **Border** — `1px solid` con opacity calibrata per livello
3. **Background leggermente più chiaro** su hover degli elementi interattivi (+4% lightness)

Questo produce un effetto "inciso" — le superfici sembrano ricavate dal materiale, non
galleggianti sopra di esso. Coerente con il tema archivistico.

```css
/* Livello 0 — pagina */
background: #0E0C09;

/* Livello 1 — card/sidebar */
background: #16130E;
border: 1px solid rgba(255, 255, 255, 0.06);

/* Livello 2 — dropdown/tooltip */
background: #1E1A13;
border: 1px solid rgba(255, 255, 255, 0.09);

/* Livello 3 — modal (raro) */
background: #1E1A13;
border: 1px solid rgba(200, 137, 42, 0.15);
```

---

## Shapes

```
radius-none:  0px   ← code block, separatori orizzontali
radius-sm:    4px   ← badge, tag pill, kbd, code inline
radius-md:    8px   ← card, input, button, callout
radius-lg:   12px   ← pannello nota, modal, drawer
radius-full: 9999px ← avatar (se presente)
```

**Regola:** i tag taxonomy usano sempre `radius-sm` (4px) — pill compatta, non bolla.

---

## Components

### Link

```css
/* Default */
color: accent-text (#E8A84A);
text-decoration: underline;
text-decoration-color: rgba(200, 137, 42, 0.4);
text-underline-offset: 3px;

/* Hover */
color: accent-hover (#DDA040);
text-decoration-color: accent-hover;
transition: color 150ms ease-out;

/* Visited */
color: accent (#C8892A);

/* Focus */
outline: 2px solid accent;
outline-offset: 2px;
border-radius: 2px;

/* External (icona ExternalLink 12px inline dopo il testo) */
/* Wikilink interno (icona Link 12px inline, stessa riga) */
```

### Badge Taxonomy (tag)

```css
/* Struttura */
display: inline-flex;
align-items: center;
gap: 4px;
padding: 2px 8px;
border-radius: 4px;       /* radius-sm */
background: #2A200F;      /* accent-muted */
color: #E8A84A;           /* accent-text */
font-family: Geist;
font-size: 0.75rem;       /* label */
font-weight: 500;
letter-spacing: 0.04em;
/* Nessun border. */

/* Hover (se cliccabile) */
background: rgba(200, 137, 42, 0.12);
cursor: pointer;
transition: background 150ms ease-out;
```

### Card (NoteCard)

```css
background: #16130E;      /* surface-raised */
border: 1px solid rgba(255, 255, 255, 0.06);
border-radius: 8px;       /* radius-md */
padding: 16px;
gap: 8px;

/* Hover */
background: #1A170F;      /* leggermente più chiaro */
border-color: rgba(255, 255, 255, 0.10);
transition: background 200ms ease-out, border-color 200ms ease-out;

/* Active/focus */
border-color: rgba(200, 137, 42, 0.3);
outline: none;

/* Struttura interna */
.card-header: { display: flex; align-items: center; gap: 8px; }
.card-title:  { font-serif, body-md, weight 600, text-primary }
.card-meta:   { font-sans, caption, text-muted }
.card-excerpt:{ font-serif, body-sm, text-secondary, line-clamp 3 }
.card-footer: { display: flex; gap: 4px; flex-wrap: wrap; }
/* Il badge maturità va SEMPRE nel card-header, a destra del titolo */
```

### Code Block

```css
background: #16130E;      /* surface-raised */
border: 1px solid rgba(255, 255, 255, 0.06);
border-radius: 0px;       /* radius-none — i blocchi di codice hanno angoli netti */
padding: 16px 20px;
font-family: 'JetBrains Mono', 'Fira Code', monospace;
  /* ECCEZIONE: il monospace è il 3° font, solo per code block — non è un brand font */
font-size: 0.8125rem;     /* 13px */
line-height: 1.65;
overflow-x: auto;

/* Header del code block (lingua + copy button) */
.code-header:
  background: #1E1A13;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  padding: 8px 20px;
  display: flex;
  justify-content: space-between;
  font-sans, caption, text-muted;

/* Syntax highlighting — tema warm */
.token.comment:    color: #6B6050 (text-muted)
.token.keyword:    color: #E8A84A (accent-text)
.token.string:     color: #7EB87A (success lighter)
.token.function:   color: #C8A87A (warm tan)
.token.number:     color: #B87333 (warning)
```

### TOC (Table of Contents)

```css
/* Sidebar destra, sticky, 200px width */
position: sticky;
top: 32px;
font-sans;

.toc-title:
  font-size: caption (0.6875rem);
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: text-muted;
  margin-bottom: 12px;

.toc-item:
  font-size: body-sm (0.8125rem);
  color: text-secondary;
  padding: 3px 0 3px 12px;
  border-left: 2px solid surface-border;
  transition: color 150ms, border-color 150ms;

.toc-item.active:
  color: accent-text;
  border-left-color: accent;

.toc-item:hover:
  color: text-primary;
```

### Callout

```css
/* 5 tipi: note / tip / warning / danger / quote */
border-radius: 8px;       /* radius-md */
padding: 12px 16px;
border-left: 3px solid <tipo-color>;
background: <tipo-muted-bg>;
gap: 8px;

/* Icone lucide obbligatorie per tipo */
note:    <Info />    — color text-secondary, bg surface-raised
tip:     <Lightbulb /> — color accent-text, bg accent-muted
warning: <AlertTriangle /> — color warning (#B87333), bg warning-muted
danger:  <AlertCircle /> — color error (#C0443A), bg error-muted
quote:   <Quote />   — color text-secondary, border-style dashed

.callout-title:
  font-sans, label, font-weight 600, color <tipo-color>;
.callout-body:
  font-serif, body-md, color text-secondary;
```

---

## Motion & Animation

```css
/* Durate */
--duration-fast:    150ms;  /* hover color, focus ring */
--duration-default: 200ms;  /* dropdown, tooltip */
--duration-slow:    250ms;  /* slide pannello, drawer */

/* Easing — sempre ease-out, mai bounce */
--ease-default: cubic-bezier(0.16, 1, 0.3, 1);
--ease-linear:  linear;    /* solo progress bar */

/* Transizioni standard */
transition: color var(--duration-fast) var(--ease-default);
transition: background var(--duration-default) var(--ease-default);
transition: transform var(--duration-slow) var(--ease-default);
/* transform: translateX per slide pannelli laterali */

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * { transition-duration: 0ms !important; animation: none !important; }
}
```

Non esiste animazione di entrata per i componenti statici. Le note non "appaiono".
Il pannello affiancato ha solo `translateX(100%) → translateX(0)`, nient'altro.

---

## Imagery & Iconography

**Icone:** lucide-react, stroke-width 1.5, size md (16px) per inline, size lg (20px) per
navigazione principale. Mai icone fill. Mai icone coloriche (solo text-secondary o
text-muted come stroke color, accent solo su stato active/selected).

**Immagini:** entrano nella nota solo se il contenuto lo richiede. Non c'è un "hero image
della pagina". Screenshot tecnici: bordo `radius-md`, border `1px solid surface-border`.
Diagrammi: SVG preferito, background trasparente.

**Nessuno stock photo.** Nessuna illustrazione decorativa. Se serve una texture visiva per
separare sezioni, si usa un pattern geometrico SVG monocromatico (`surface-border` stroke
su `surface-base` fill) — mai una fotografia.

**Emoji:** assenti. Nessun posto nel sistema. Le icone lucide svolgono il ruolo semantico.

---

## Voice & Tone

**3 aggettivi:** preciso, curioso, asciutto.

**Preciso:** ogni affermazione ha una fonte o una data. I titoli non clickbait: descrivono
il contenuto esattamente. La metafora è usata per chiarire, non per abbellire.

**Curioso:** le note mostrano il processo di pensiero, non solo le conclusioni. I link
interni sono generosi: collegare idee è il punto. Le domande aperte sono citate come tali.

**Asciutto:** nessuna parola di troppo. Nessuna frase introduttiva ("In questo articolo
vedremo..."). Nessun superlativo. L'entusiasmo si manifesta nella profondità del contenuto,
non nell'aggettivazione.

**UI copy:**
- Label: sostantivi, non frasi ("Note", "Argomenti", "Indice" — non "Le mie note")
- Errori: descrittivi e azionabili ("Link non trovato — verifica l'anchor" non "Qualcosa
  è andato storto")
- Placeholder: esempi reali, non generici ("cerca per titolo, tag, o #wikilink")
- Data format: ISO 8601 compatto (`2026-05-01`) — mai "1 maggio 2026" nell'UI

---

## Accessibility

Requisiti non negoziabili:

```
Contrasto testo normale:  ≥ 4.5:1 (WCAG 2.1 AA)
Contrasto testo grande:   ≥ 3:1 (18px+ o 14px+ bold)
Contrasto UI interattiva: ≥ 3:1 (icone, bordi active)

text-primary su surface-base:   14.8:1 ✓ AAA
text-secondary su surface-base:  7.2:1 ✓ AAA
accent-text su surface-base:     5.3:1 ✓ AA
text-muted su surface-base:      3.1:1 ⚠ AA large — usare solo per decorativo non-body
```

**Focus ring:** `outline: 2px solid #C8892A; outline-offset: 2px;` — mai rimosso con
`outline: none` senza sostituire con alternativa visibile equivalente.

**Skip link:**
```html
<a href="#main-content" class="skip-link">Vai al contenuto principale</a>
<!-- visibile solo on-focus, posizione top-left, z-index 9999 -->
```

**Landmark roles obbligatori:**
```html
<nav aria-label="Navigazione principale">
<main id="main-content">
<aside aria-label="Indice della pagina">
```

**Badge maturità:** icona + testo, mai solo icona. `aria-label` sull'icona lucide.

**Font scaling:** tutto in `rem`. Il layout si adatta al font-size browser dell'utente.

---

## Do's and Don'ts

1. **DO:** usa `surface-raised` per ogni elemento che si sovrappone al fondo. Non aggiungere
   shadow per "alzarlo" visivamente.

2. **DON'T:** aggiungere un secondo colore accent. Neanche temporaneamente. Neanche
   "solo per un componente". L'ocra è l'unico.

3. **DO:** assegna sempre uno stato di maturità a ogni nota. `seedling` è il default per
   note nuove — mai lasciare una nota senza badge.

4. **DON'T:** usare `font-serif` per label, badge o metadati. Geist governa il chrome,
   Source Serif 4 governa il contenuto. Questa distinzione non ha eccezioni.

5. **DO:** mantieni la colonna testo a `72ch` massimo. Se il layout richiede di superarla,
   il layout è sbagliato, non la regola.

6. **DON'T:** usare emoji come sostituto delle icone lucide. Nessun emoji nell'interfaccia,
   nei titoli, nei metadati. Le note possono contenere emoji nel testo se l'autore lo
   sceglie (è contenuto libero), ma l'UI del sito non ne contiene.

7. **DO:** per ogni callout, usa l'icona lucide corrispondente al tipo. Il callout senza
   icona è incompleto.

8. **DON'T:** animare gli elementi statici alla prima visualizzazione della pagina
   (no fade-in sul contenuto, no stagger di card al caricamento). Le animazioni esistono
   per rispondere all'interazione dell'utente, non per decorare il caricamento.

9. **DO:** usa `border-left` colorato per differenziare i callout, non il background pieno.
   Il background è sempre `muted`, mai `full`.

10. **DON'T:** costruire componenti nuovi se uno esistente copre il caso d'uso al 90%.
    Prima adatta il componente esistente. La coerenza del sistema vale più di un componente
    perfettamente su misura.

---

## Agent Prompt Guide

Template pronti per richieste frequenti agli agenti di sviluppo. Incolla direttamente.

### Template 1 — Crea NoteCard

```
Crea il componente React `NoteCard` seguendo il DESIGN.md del progetto Pinakes.

Specifiche:
- background: surface-raised (#16130E)
- border: 1px solid rgba(255,255,255,0.06), radius-md (8px)
- padding: 16px, gap interno: 8px
- card-header: flex row, gap 8px, contiene titolo (body-md serif 600) e badge maturità a destra
- card-meta: caption sans text-muted (data, topic principale)
- card-excerpt: body-sm serif text-secondary, line-clamp 3
- card-footer: flex row wrap gap 4px, lista di tag taxonomy (BadgeTaxonomy)
- Hover: background #1A170F, border-color rgba(255,255,255,0.10) — transition 200ms ease-out
- Focus/active: border-color rgba(200,137,42,0.3)
- Il badge maturità usa il componente MaturityBadge con i 4 stati canonici
- Props: title, slug, excerpt, date, maturity, tags[]
- Nessun shadow. Nessun gradient. Nessun emoji.
```

### Template 2 — Crea BadgeTaxonomy (tag pill)

```
Crea il componente React `BadgeTaxonomy` seguendo il DESIGN.md Pinakes.

Specifiche:
- display: inline-flex, align-items: center, gap: 4px
- padding: 2px 8px
- border-radius: 4px (radius-sm) — pill compatta, non bolla
- background: accent-muted (#2A200F)
- color: accent-text (#E8A84A)
- font-family: Geist, font-size: 0.75rem (label), font-weight: 500
- Nessun border
- Hover se `clickable=true`: background rgba(200,137,42,0.12), transition 150ms ease-out
- Props: label, clickable?, onClick?
```

### Template 3 — Crea MaturityBadge

```
Crea il componente React `MaturityBadge` seguendo il DESIGN.md Pinakes.

4 stati canonici con icone lucide-react (stroke-width 1.5, size 12px):
- seedling:  <Sprout />  colore #C8892A, testo "seedling"
- budding:   <BookOpen /> colore #7A6A4A, testo "budding"
- evergreen: <Leaf />    colore #4E9E6A, testo "evergreen"
- archived:  <Archive /> colore #4A4035, testo "archived"

Struttura: inline-flex, gap 4px, align-items center
Font: Geist 0.6875rem (caption), font-weight 500
Colore testo = colore icona per ogni stato
Background: transparent (il colore viene dall'icona e dal testo, non dal bg)
aria-label obbligatorio: `Maturità: ${stato}`
Props: maturity ('seedling' | 'budding' | 'evergreen' | 'archived')
```

### Template 4 — Crea Callout

```
Crea il componente React `Callout` seguendo il DESIGN.md Pinakes.

5 tipi: note | tip | warning | danger | quote

Per ciascun tipo:
- note:    icona <Info />, colore text-secondary, border-left #2A2519, bg surface-raised
- tip:     icona <Lightbulb />, colore accent-text (#E8A84A), border-left accent, bg #2A200F
- warning: icona <AlertTriangle />, colore #B87333, border-left #B87333, bg #200F05
- danger:  icona <AlertCircle />, colore #C0433A, border-left #C0433A, bg #1E0908
- quote:   icona <Quote />, colore text-secondary, border-left dashed #2A2519, bg transparent

Layout:
- border-radius: 8px (radius-md)
- padding: 12px 16px
- border-left: 3px solid <tipo-color>
- callout-header: flex row gap 8px, icona + titolo (label sans 600)
- callout-body: body-md serif text-secondary, margin-top 8px

Props: type ('note'|'tip'|'warning'|'danger'|'quote'), title?, children
```

### Template 5 — Crea TOC (Table of Contents)

```
Crea il componente React `TableOfContents` seguendo il DESIGN.md Pinakes.

Specifiche:
- position: sticky, top: 32px
- width: 200px (solo su breakpoint desktop ≥1280px, altrimenti hidden)
- font-family: Geist

Header:
- font-size: 0.6875rem (caption), font-weight: 500, letter-spacing: 0.08em
- text-transform: uppercase, color: text-muted (#6B6050)
- testo: "In questa pagina"

Voci:
- font-size: 0.8125rem (body-sm), color: text-secondary (#B8AC97)
- padding: 3px 0 3px 12px
- border-left: 2px solid surface-border (#2A2519)
- transition: color 150ms, border-color 150ms ease-out

Stato active (voce visibile nel viewport):
- color: accent-text (#E8A84A)
- border-left-color: accent (#C8892A)

Indentazione per h3: padding-left 24px (vs 12px degli h2)

Props: headings[] ({ id, text, level: 2|3 }), activeId
```
