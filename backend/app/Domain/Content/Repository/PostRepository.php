<?php

declare(strict_types=1);

namespace App\Domain\Content\Repository;

use App\Domain\Content\Aggregate\Post;
use App\Domain\Content\ValueObject\ContentId;
use App\Domain\Content\ValueObject\Slug;
use App\Domain\Workspace\ValueObject\WorkspaceId;

interface PostRepository
{
    public function find(ContentId $id): ?Post;

    public function findBySlug(WorkspaceId $workspaceId, Slug $slug): ?Post;

    public function existsBySlug(WorkspaceId $workspaceId, Slug $slug): bool;

    public function save(Post $post): void;

    public function delete(ContentId $id): void;
}
