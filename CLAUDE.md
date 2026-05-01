# Pinakes — Convenzioni di Sviluppo Interno

Personal wiki polimata multi-tenant con architettura DDD + Hexagonal. Questo documento guida lo sviluppo lato Claude Code.

## Stack Tecnico

- **PHP 8.3+** (strict_types declare su ogni file)
- **Laravel 12** (no legacy facades, service container)
- **MariaDB 11.8.3** (FULLTEXT indexes, COLLATE utf8mb4_unicode_ci)
- **Redis 7** (cache driver, session store, queue backend)
- **Horizon** (job orchestration e monitoraggio)
- **TypeScript 5** (strict mode)
- **React 18** (functional components, hooks)
- **Vite 6** (tree-shaking, dynamic imports)
- **Tailwind CSS v4** (JIT compiler, design tokens)
- **shadcn/ui** (headless components, Radix primitives)

## Architettura DDD + Hexagonal

### Layer Structure

```
backend/
├── app/
│   ├── Domain/              Logica di dominio pura (zero dipendenze Laravel)
│   ├── Application/         Use cases, query handlers, DTOs, events
│   ├── Infrastructure/      Implementazioni concrete (Eloquent, Mail, File)
│   └── Interface/           Controller, Route model binding, Middleware
├── routes/                  Entry point HTTP
├── tests/
│   ├── Domain/              Test logica pura
│   ├── Application/         Test use cases
│   └── Feature/             Test API (integration con DB)
└── database/                Migrations, seeders
```

### Bounded Contexts

- **Identity**: Autenticazione multi-tenant, user ownership
- **Workspace**: Confini tenant, configurazione, settings
- **Content**: Note, post, snippet, bookmark, sketch aggregates
- **Taxonomy**: Faceted classification (type, topic, subtopic, maturity, status, source, tags, rating, read_time)
- **Library**: Reading queue, status tracking, collections
- **Search**: Full-text indexing e querying (MariaDB/Meilisearch)

### Regole d'Oro

1. **Domain layer è puro**: No Eloquent, no Laravel facades, no HTTP. Usare constructor injection di interfacce.
2. **Repository pattern**: Interfaccia in `Domain/<BC>/Repository/`, implementazione in `Infrastructure/Persistence/Eloquent/Repository/`.
3. **Use Case = Handler**: Ogni operazione è uno use case con responsabilità singola. `Application/<BC>/UseCase/CreateFooHandler.php`.
4. **No Eloquent nei controller**: Injettare use case o query handler.
5. **Aggregates**: Root entity in `Domain/<BC>/Aggregate/Foo.php`, con soli value object interni. Aggiornamenti passano per metodi del root (no setter pubblici).
6. **Value Objects**: Immutable, `Domain/<BC>/ValueObject/FooId.php`, con validazione nel costruttore.
7. **Domain Events**: Pubblicati via Laravel event bus. Listener async = Horizon job per side-effect (search index, OG fetch, backlink resolve).

## Convenzioni di Codice

### PHP (PSR-12)

```php
<?php

declare(strict_types=1);

namespace App\Domain\Content\Aggregate;

use App\Domain\Content\ValueObject\NoteId;

final class Note
{
    public function __construct(
        private NoteId $id,
        private string $title,
        private string $body,
    ) {}

    public function getId(): NoteId
    {
        return $this->id;
    }
}
```

**Regole**:
- `declare(strict_types=1);` su OGNI file PHP
- Constructor property promotion quando possibile
- No magic `__get`, `__set`, `__call`
- Final su classi concrete (non astratte)
- Interfacce in directory separate da implementazioni

### Nessun Commento Inline

Solo **DocBlock** per classi, metodi, proprietà. Il codice parla da solo grazie a nomi descrittivi.

```php
/**
 * Create a new note in the workspace.
 *
 * @param CreateNoteRequest $request
 * @return Note
 * @throws InvalidNoteException
 */
public function handle(CreateNoteRequest $request): Note
{
    $noteId = NoteId::generate();
    
    // ✓ Nome variabile descrive lo scopo
    // ✓ Niente commenti ridondanti
}
```

### Naming Conventions

| Elemento | Path Esempio | Pattern |
|----------|--------------|---------|
| Aggregate Root | `Domain/Content/Aggregate/Note.php` | Singolare, PascalCase |
| Value Object | `Domain/Content/ValueObject/NoteId.php` | Suffisso `Id` o `Value` |
| Eloquent Model | `Infrastructure/Persistence/Eloquent/Model/NoteModel.php` | Suffisso **Model** |
| Repository Interface | `Domain/Content/Repository/NoteRepository.php` | Interfaccia in Domain |
| Repository Impl. | `Infrastructure/Persistence/Eloquent/Repository/NoteEloquentRepository.php` | Suffix `EloquentRepository` |
| Use Case Handler | `Application/Content/UseCase/CreateNoteHandler.php` | Suffisso `Handler` |
| Query Handler | `Application/Content/Query/GetNoteByIdHandler.php` | Suffisso `Handler` |
| Request DTO | `Application/Content/DTO/CreateNoteRequest.php` | Suffisso `Request` |
| Response DTO | `Application/Content/DTO/NoteResponse.php` | Suffisso `Response` |
| Domain Event | `Domain/Content/Event/NoteCreatedEvent.php` | Suffisso `Event` |
| Event Listener | `Application/Content/EventListener/IndexNoteWhenCreatedListener.php` | Descrittivo + `Listener` |
| Migration | `database/migrations/2026_05_01_create_notes_table.php` | Timestamp + descri |
| Model Factory | `database/factories/NoteFactory.php` | Nome model singolare + `Factory` |
| Seeder | `database/seeders/NoteSeeder.php` | Nome model singolare + `Seeder` |

## Multi-Tenant

Tutti gli aggregate content-related hanno `workspace_id`:

```php
final class Note
{
    public function __construct(
        private WorkspaceId $workspaceId,
        private NoteId $id,
        private string $title,
    ) {}
}
```

**Isolation**:
- Middleware `WorkspaceContext` estrae tenant da URL path (`/workspace/{slug}/notes/{id}`)
- Trait `BelongsToWorkspace` su Eloquent model (scoped query auto)
- Repository riceve `WorkspaceId` esplicito: **defense in depth**

```php
interface NoteRepository
{
    public function findById(WorkspaceId $workspaceId, NoteId $id): ?Note;
    public function save(Note $note): void;
}
```

## Visibility (Public / Unlisted / Private)

Enum `Visibility` in Value Object:

```php
enum Visibility: string
{
    case Public = 'public';
    case Unlisted = 'unlisted';
    case Private = 'private';
}
```

**Regola di defense in depth**:
1. Route pubblica (no auth) filtra per `visibility = public` o `unlisted`
2. Applicazione filtra per visibility PRIMA di esporre nel response
3. Non affidarsi al solo Eloquent query scope

## Domain Events

Aggregates pubblicano eventi durante `create()`, `update()`, ecc:

```php
final class Note
{
    private array $events = [];

    public static function create(/* params */): self
    {
        $note = new self(/* */);
        $note->events[] = new NoteCreatedEvent(
            noteId: $note->id,
            workspaceId: $note->workspaceId,
            title: $note->title,
        );
        return $note;
    }

    public function releaseEvents(): array
    {
        return array_splice($this->events, 0);
    }
}
```

Use case pubblica:

```php
final class CreateNoteHandler
{
    public function handle(CreateNoteRequest $request): NoteResponse
    {
        $note = Note::create(/* */);
        $this->noteRepository->save($note);

        // Pubblica su event bus (async via Horizon)
        foreach ($note->releaseEvents() as $event) {
            event($event);
        }

        return NoteResponse::fromAggregate($note);
    }
}
```

Listener async:

```php
final class IndexNoteWhenCreatedListener
{
    public function __construct(private SearchService $search) {}

    public function handle(NoteCreatedEvent $event): void
    {
        // Side-effect: index su Meilisearch, fetch OG, resolve backlinks
        $this->search->index($event->noteId);
    }
}
```

## Testing

- **Domain tests**: Logica pura, no fixture DB (unit test)
- **Feature tests**: Integration con DB reale, test API, asserzioni HTTP
- **MAI mock il database** nei feature test (querystring, relationships devono funzionare reali)

```php
// tests/Feature/Content/CreateNoteTest.php

test('create note in workspace', function () {
    $workspace = Workspace::factory()->create();
    $user = User::factory()->for($workspace)->create();

    $response = actingAs($user)->postJson("/api/v1/workspaces/{$workspace->slug}/notes", [
        'title' => 'My Note',
        'body' => 'Content here',
        'visibility' => 'private',
    ]);

    expect($response->status())->toBe(201);
    expect($response->json('data.id'))->toBeString();
});
```

## DESIGN.md

**Leggere DESIGN.md PRIMA di scrivere UI component**. Non inventare valori (colori, spacing, font size). DESIGN.md è la fonte di verità per:
- Palette (primary, secondary, accent, neutral)
- Typography (font family, scale, line-height)
- Spacing scale (4px base, 4/8/12/16/24/32/...)
- Component patterns (button sizes, input states, modals)
- Responsive breakpoints

```typescript
// ✓ Corretto: token da DESIGN.md
export const Button: React.FC<ButtonProps> = ({ size = 'md', variant = 'primary' }) => {
    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };
    return <button className={`${sizeClasses[size]} bg-primary text-white rounded-lg`} />;
};
```

## Comandi Frequenti

```bash
# Backend setup
php artisan migrate:fresh --seed
php artisan tinker
php artisan horizon          # Monitor job queue

# Frontend
npm run dev                   # Vite dev server
npm run build                 # Production build
npm run type-check            # TypeScript check
npm run lint                  # ESLint + Prettier

# Testing
php artisan test
php artisan test --filter=CreateNoteTest
npm run test
```

## Regole Specifiche di Pinakes

1. **WorkspaceId sempre esplicito** negli use case. Mai ricavare dalla sessione/auth context nel domain.
2. **Backlink auto**: Quando una nota viene salvata, parser Wikilink `[[NoteTitle]]` risolve link e crea backlink inversi (event-driven via Horizon).
3. **Maturity lifecycle**: Enum `Maturity: seedling|budding|evergreen|archived`. Transizioni via method nel aggregate (no setter diretto).
4. **9-axis taxonomy**: JSON column `taxonomy` con structure `{type, topic, subtopic, maturity, reading_status, source, tags[], rating, read_time_minutes}`. Validata in Value Object.
5. **Full-text search MVP**: Query su colonne `title`, `body`, `tags` con FULLTEXT index. No Meilisearch sino a v2.
6. **RSS generation**: Endpoint `/workspace/{slug}/feed.rss` con solo note `visibility=public`. Cache 1h.
7. **Multi-tenant query scoping**: Repository SEMPRE riceve `WorkspaceId` esplicito. No reliance su global scopes di Eloquent.

---

**Ultimo aggiornamento**: 2026-05-01
**Author**: Vincenzo Pirozzi
**License**: MIT
