<?php

declare(strict_types=1);

namespace App\Domain\Workspace\Repository;

use App\Domain\Identity\ValueObject\UserId;
use App\Domain\Workspace\Aggregate\Membership;
use App\Domain\Workspace\ValueObject\WorkspaceId;

interface MembershipRepository
{
    public function findByWorkspaceAndUser(WorkspaceId $workspaceId, UserId $userId): ?Membership;

    /**
     * @return Membership[]
     */
    public function findByUser(UserId $userId): array;

    /**
     * @return Membership[]
     */
    public function findByWorkspace(WorkspaceId $workspaceId): array;

    public function save(Membership $membership): void;
}
