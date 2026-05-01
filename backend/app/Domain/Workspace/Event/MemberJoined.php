<?php

declare(strict_types=1);

namespace App\Domain\Workspace\Event;

use App\Domain\Identity\ValueObject\UserId;
use App\Domain\Shared\Bus\DomainEvent;
use App\Domain\Workspace\ValueObject\Role;
use App\Domain\Workspace\ValueObject\WorkspaceId;
use DateTimeImmutable;

final class MemberJoined implements DomainEvent
{
    public function __construct(
        public readonly WorkspaceId $workspaceId,
        public readonly UserId $userId,
        public readonly Role $role,
        public readonly DateTimeImmutable $occurredAt,
    ) {}
}
