<?php

declare(strict_types=1);

namespace App\Domain\Content\Event;

use App\Domain\Content\ValueObject\ContentId;
use App\Domain\Content\ValueObject\Maturity;
use App\Domain\Shared\Bus\DomainEvent;
use DateTimeImmutable;

final class MaturityPromoted implements DomainEvent
{
    public function __construct(
        public readonly ContentId $contentId,
        public readonly Maturity $newMaturity,
        public readonly DateTimeImmutable $occurredAt,
    ) {}
}
