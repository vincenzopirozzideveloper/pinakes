<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Eloquent\Mapper;

use App\Domain\Content\Aggregate\Note;
use App\Domain\Content\ValueObject\ContentId;
use App\Domain\Content\ValueObject\Excerpt;
use App\Domain\Content\ValueObject\Markdown;
use App\Domain\Content\ValueObject\Maturity;
use App\Domain\Content\ValueObject\Slug;
use App\Domain\Content\ValueObject\Title;
use App\Domain\Content\ValueObject\Visibility;
use App\Domain\Identity\ValueObject\UserId;
use App\Domain\Workspace\ValueObject\WorkspaceId;
use App\Infrastructure\Persistence\Eloquent\Model\ContentModel;
use DateTimeImmutable;

final class NoteMapper
{
    /**
     * Reconstitute a Note aggregate from a ContentModel row.
     */
    public function toAggregate(ContentModel $model): Note
    {
        $meta     = is_array($model->meta) ? $model->meta : [];
        $maturity = $meta['maturity'] ?? 'seedling';

        return Note::reconstitute(
            id:          ContentId::fromString($model->ulid),
            workspaceId: WorkspaceId::fromInt($model->workspace_id),
            authorId:    UserId::fromInt($model->created_by),
            title:       Title::fromString($model->title),
            slug:        Slug::fromString($model->slug),
            body:        Markdown::fromString((string) $model->body),
            excerpt:     $model->excerpt !== null
                             ? Excerpt::fromString($model->excerpt)
                             : Excerpt::empty(),
            maturity:    Maturity::fromString($maturity),
            visibility:  Visibility::fromString($model->visibility),
            createdAt:   new DateTimeImmutable($model->created_at->toDateTimeString()),
            updatedAt:   new DateTimeImmutable($model->updated_at->toDateTimeString()),
        );
    }

    /**
     * Convert a Note aggregate to an array suitable for Eloquent upsert.
     * Maturity is persisted inside the meta JSON column as the DB schema
     * uses status_id for workflow state; meta carries domain-level maturity.
     *
     * @return array<string, mixed>
     */
    public function toRow(Note $note): array
    {
        return [
            'ulid'         => $note->id()->toString(),
            'workspace_id' => $note->workspaceId()->toInt(),
            'created_by'   => $note->authorId()->toInt(),
            'type'         => 'note',
            'visibility'   => $note->visibility()->value,
            'title'        => $note->title()->toString(),
            'slug'         => $note->slug()->toString(),
            'body'         => $note->body()->toString(),
            'excerpt'      => $note->excerpt()->isEmpty() ? null : $note->excerpt()->toString(),
            'meta'         => json_encode(['maturity' => $note->maturity()->value]),
            'updated_at'   => $note->updatedAt()->format('Y-m-d H:i:s'),
        ];
    }
}
