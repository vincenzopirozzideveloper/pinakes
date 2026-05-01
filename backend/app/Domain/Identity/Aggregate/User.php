<?php

declare(strict_types=1);

namespace App\Domain\Identity\Aggregate;

use App\Domain\Identity\Event\UserRegistered;
use App\Domain\Identity\ValueObject\Email;
use App\Domain\Identity\ValueObject\HashedPassword;
use App\Domain\Identity\ValueObject\UserId;
use App\Domain\Shared\Bus\DomainEvent;
use App\Domain\Shared\ValueObject\Ulid;
use DateTimeImmutable;

final class User
{
    /** @var DomainEvent[] */
    private array $recordedEvents = [];

    private function __construct(
        private readonly UserId $id,
        private readonly Ulid $ulid,
        private readonly Email $email,
        private readonly string $name,
        private ?HashedPassword $passwordHash,
        private readonly DateTimeImmutable $createdAt,
    ) {}

    /**
     * Register a new user (raises UserRegistered event).
     */
    public static function register(
        UserId $id,
        Ulid $ulid,
        Email $email,
        string $name,
        HashedPassword $passwordHash,
        DateTimeImmutable $now,
    ): self {
        $user = new self(
            id: $id,
            ulid: $ulid,
            email: $email,
            name: $name,
            passwordHash: $passwordHash,
            createdAt: $now,
        );

        $user->recordedEvents[] = new UserRegistered(
            userId: $id,
            email: $email,
            name: $name,
            occurredAt: $now,
        );

        return $user;
    }

    /**
     * Reconstitute a User aggregate from persistence (no events raised).
     */
    public static function reconstitute(
        UserId $id,
        Ulid $ulid,
        Email $email,
        string $name,
        ?HashedPassword $passwordHash,
        DateTimeImmutable $createdAt,
    ): self {
        return new self(
            id: $id,
            ulid: $ulid,
            email: $email,
            name: $name,
            passwordHash: $passwordHash,
            createdAt: $createdAt,
        );
    }

    /**
     * Pull and clear all recorded domain events.
     *
     * @return DomainEvent[]
     */
    public function pullEvents(): array
    {
        $events = $this->recordedEvents;
        $this->recordedEvents = [];

        return $events;
    }

    public function getId(): UserId
    {
        return $this->id;
    }

    public function getUlid(): Ulid
    {
        return $this->ulid;
    }

    public function getEmail(): Email
    {
        return $this->email;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getPasswordHash(): ?HashedPassword
    {
        return $this->passwordHash;
    }

    public function getCreatedAt(): DateTimeImmutable
    {
        return $this->createdAt;
    }
}
