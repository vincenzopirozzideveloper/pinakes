<?php

declare(strict_types=1);

namespace App\Domain\Workspace\Event;

use App\Domain\Identity\ValueObject\UserId;
use App\Domain\Shared\Bus\DomainEvent;
use App\Domain\Workspace\ValueObject\WorkspaceId;
use App\Domain\Workspace\ValueObject\WorkspaceSlug;
use DateTimeImmutable;

final class WorkspaceCreated implements DomainEvent
{
    public function __construct(
        public readonly WorkspaceId $workspaceId,
        public readonly WorkspaceSlug $slug,
        public readonly UserId $ownerUserId,
        public readonly string $name,
        public readonly DateTimeImmutable $occurredAt,
    ) {}
}
