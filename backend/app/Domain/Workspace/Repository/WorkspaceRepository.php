<?php

declare(strict_types=1);

namespace App\Domain\Workspace\Repository;

use App\Domain\Identity\ValueObject\UserId;
use App\Domain\Workspace\Aggregate\Workspace;
use App\Domain\Workspace\ValueObject\WorkspaceId;
use App\Domain\Workspace\ValueObject\WorkspaceSlug;

interface WorkspaceRepository
{
    public function findById(WorkspaceId $id): ?Workspace;

    public function findBySlug(WorkspaceSlug $slug): ?Workspace;

    /**
     * @return Workspace[]
     */
    public function findByOwner(UserId $ownerUserId): array;

    public function save(Workspace $workspace): void;
}
