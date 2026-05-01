<?php

declare(strict_types=1);

namespace App\Domain\Content\Repository;

use App\Domain\Content\Aggregate\Bookmark;
use App\Domain\Content\ValueObject\ContentId;
use App\Domain\Workspace\ValueObject\WorkspaceId;

interface BookmarkRepository
{
    public function find(ContentId $id): ?Bookmark;

    public function existsByUrl(WorkspaceId $workspaceId, string $url): bool;

    public function save(Bookmark $bookmark): void;

    public function delete(ContentId $id): void;
}
