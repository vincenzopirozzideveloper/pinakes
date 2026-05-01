<?php

declare(strict_types=1);

namespace App\Domain\Content\Repository;

use App\Domain\Content\Aggregate\Note;
use App\Domain\Content\ValueObject\ContentId;
use App\Domain\Content\ValueObject\Slug;
use App\Domain\Workspace\ValueObject\WorkspaceId;

interface NoteRepository
{
    public function find(ContentId $id): ?Note;

    public function findBySlug(WorkspaceId $workspaceId, Slug $slug): ?Note;

    public function existsBySlug(WorkspaceId $workspaceId, Slug $slug): bool;

    public function save(Note $note): void;

    public function delete(ContentId $id): void;
}
