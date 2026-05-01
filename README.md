# Pinakes

> A personal wiki and digital garden for polyphonic knowledge, inspired by Callimachus' Pinakes of Alexandria.

Pinakes is a multi-tenant digital knowledge workspace built with modern tech and timeless information architecture principles. Organize your thoughts, bookmarks, snippets, and sketches across a 9-axis taxonomy. Write wikilinks, track content maturity, and share selectively with the world.

## Features

- **Multi-type content**: Posts, notes, bookmarks, code snippets, sketches, and more
- **9-axis faceted taxonomy**: Type, topic, subtopic, maturity status, reading status, source, tags, rating, read time
- **Wikilink + automatic backlinks**: Navigate your knowledge graph effortlessly
- **Multi-tenant workspaces**: Separate gardens for different domains or collaborators
- **Visibility control**: Public, unlisted, or private for each note
- **Library & read-later queue**: Curate your reading with status tracking
- **Command palette**: Cmd+K to access commands and quick actions
- **Full-text search**: MariaDB FULLTEXT (MVP) with Meilisearch v2 support planned
- **Markdown editing**: Shiki code highlighting, embedded syntax themes
- **Maturity tracking**: Seedling → budding → evergreen → archived lifecycle
- **RSS feed**: Export public content as valid RSS/Atom feeds

## Architecture

Built on **Domain-Driven Design** and **Hexagonal (Ports & Adapters)** architecture. Core bounded contexts:

- **Identity**: Multi-tenant user management and workspace isolation
- **Workspace**: Tenant boundaries and configuration
- **Content**: Notes, posts, snippets, bookmarks, sketches
- **Taxonomy**: Faceted classification system
- **Library**: Reading queue and status tracking
- **Search**: Full-text indexing and querying

See `docs/architecture.md` for detailed diagrams and context maps.

## Tech Stack

**Backend**
- PHP 8.3+
- Laravel 12
- MariaDB 11
- Redis 7 (cache, sessions, queues)
- Horizon (job orchestration)

**Frontend**
- TypeScript 5
- React 18
- Vite 6
- Tailwind CSS v4
- shadcn/ui components

**Search (MVP → v2)**
- MariaDB FULLTEXT (MVP)
- Meilisearch 2.x (v2 roadmap)

## Quick Start

```bash
# Clone and setup
git clone https://github.com/vincenzopirozzideveloper/pinakes
cd pinakes

# Backend
cp .env.example .env
docker compose up -d
docker compose exec php composer install
docker compose exec php php artisan key:generate
docker compose exec php php artisan migrate --seed

# Frontend
docker compose exec frontend npm install
docker compose exec frontend npm run dev
```

Backend runs on `http://localhost:8000`, frontend on `http://localhost:5173`.

## Project Structure

```
backend/              Laravel 12 DDD-Hexagonal
├── app/
│   ├── Domain/       Aggregates, value objects, repositories
│   ├── Application/  Use cases, DTOs, queries
│   └── Infrastructure/
│       └── Persistence/  Eloquent models, repository implementations
├── routes/
├── tests/
└── database/

frontend/             Vite + React 18 + TypeScript
├── src/
│   ├── components/   shadcn/ui + custom components
│   ├── hooks/        React hooks
│   ├── pages/        Page layouts
│   ├── services/     API clients
│   ├── stores/       State management
│   └── types/        TypeScript interfaces
├── vite.config.ts
└── tailwind.config.ts
```

## Documentation

- **[DESIGN.md](./DESIGN.md)** — Visual design system, token specification, component patterns
- **[CLAUDE.md](./CLAUDE.md)** — Internal development conventions and architecture guidelines
- **[docs/architecture.md](./docs/architecture.md)** — DDD bounded contexts and system design
- **[docs/api.md](./docs/api.md)** — REST API reference (planned)

## Roadmap

**MVP (Current)**
- Core note CRUD with 9-axis taxonomy
- Wikilink + backlink resolution
- Multi-tenant isolation
- Markdown editing with code highlighting
- Full-text search (MariaDB)
- RSS feed for public content

**v2 (Planned)**
- Graph view of knowledge connections
- TipTap rich editor integration
- Multi-note composer for long-form essays
- Dynamic Open Graph generation for shared links
- CLI quick-capture tool for fast note insertion
- Meilisearch integration for advanced filtering
- Mobile-friendly UI refinements

## License

MIT License. See [LICENSE](./LICENSE) for details.

## Author

**Vincenzo Pirozzi** — A personal project exploring polymath knowledge organization in the digital age.

---

Inspired by Callimachus' *Pinakes* (Πίνακες), the first systematic catalog of the Library of Alexandria, compiled in the 3rd century BCE. That same spirit of disciplined yet expansive knowledge organization lives here.
