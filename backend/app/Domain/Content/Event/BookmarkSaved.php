<?php

declare(strict_types=1);

namespace App\Domain\Content\Event;

use App\Domain\Content\ValueObject\ContentId;
use App\Domain\Identity\ValueObject\UserId;
use App\Domain\Shared\Bus\DomainEvent;
use App\Domain\Workspace\ValueObject\WorkspaceId;
use DateTimeImmutable;

final class BookmarkSaved implements DomainEvent
{
    public function __construct(
        public readonly ContentId $contentId,
        public readonly WorkspaceId $workspaceId,
        public readonly UserId $authorId,
        public readonly string $originalUrl,
        public readonly DateTimeImmutable $occurredAt,
    ) {}
}
