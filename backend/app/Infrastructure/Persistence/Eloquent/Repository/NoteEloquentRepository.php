<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Eloquent\Repository;

use App\Domain\Content\Aggregate\Note;
use App\Domain\Content\Repository\NoteRepository;
use App\Domain\Content\ValueObject\ContentId;
use App\Domain\Content\ValueObject\Slug;
use App\Domain\Workspace\ValueObject\WorkspaceId;
use App\Infrastructure\Persistence\Eloquent\Mapper\NoteMapper;
use App\Infrastructure\Persistence\Eloquent\Model\ContentModel;

final class NoteEloquentRepository implements NoteRepository
{
    /**
     * Default status_id for newly created notes.
     * Relies on the "draft" seed row in the statuses table.
     */
    private const DEFAULT_STATUS_ID = 1;

    public function __construct(
        private readonly NoteMapper $mapper,
    ) {}

    public function find(ContentId $id): ?Note
    {
        $model = ContentModel::query()
            ->where('ulid', $id->toString())
            ->where('type', 'note')
            ->first();

        return $model !== null ? $this->mapper->toAggregate($model) : null;
    }

    public function findBySlug(WorkspaceId $workspaceId, Slug $slug): ?Note
    {
        $model = ContentModel::query()
            ->where('workspace_id', $workspaceId->toInt())
            ->where('slug', $slug->toString())
            ->where('type', 'note')
            ->first();

        return $model !== null ? $this->mapper->toAggregate($model) : null;
    }

    public function existsBySlug(WorkspaceId $workspaceId, Slug $slug): bool
    {
        return ContentModel::query()
            ->where('workspace_id', $workspaceId->toInt())
            ->where('slug', $slug->toString())
            ->where('type', 'note')
            ->exists();
    }

    public function save(Note $note): void
    {
        $row = $this->mapper->toRow($note);

        ContentModel::query()->upsert(
            [
                array_merge($row, [
                    'status_id'  => self::DEFAULT_STATUS_ID,
                    'created_at' => $note->createdAt()->format('Y-m-d H:i:s'),
                ]),
            ],
            uniqueBy: ['ulid'],
            update: [
                'title',
                'slug',
                'body',
                'excerpt',
                'meta',
                'visibility',
                'updated_at',
            ],
        );
    }

    public function delete(ContentId $id): void
    {
        ContentModel::query()
            ->where('ulid', $id->toString())
            ->where('type', 'note')
            ->delete();
    }
}
