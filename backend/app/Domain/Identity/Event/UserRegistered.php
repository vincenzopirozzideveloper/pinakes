<?php

declare(strict_types=1);

namespace App\Domain\Identity\Event;

use App\Domain\Identity\ValueObject\Email;
use App\Domain\Identity\ValueObject\UserId;
use App\Domain\Shared\Bus\DomainEvent;
use DateTimeImmutable;

final class UserRegistered implements DomainEvent
{
    public function __construct(
        public readonly UserId $userId,
        public readonly Email $email,
        public readonly string $name,
        public readonly DateTimeImmutable $occurredAt,
    ) {}
}
