<?php

declare(strict_types=1);

namespace App\Domain\Workspace\Aggregate;

use App\Domain\Identity\ValueObject\UserId;
use App\Domain\Shared\Bus\DomainEvent;
use App\Domain\Workspace\Event\MemberJoined;
use App\Domain\Workspace\ValueObject\Role;
use App\Domain\Workspace\ValueObject\WorkspaceId;
use DateTimeImmutable;

final class Membership
{
    /** @var DomainEvent[] */
    private array $recordedEvents = [];

    private function __construct(
        private readonly WorkspaceId $workspaceId,
        private readonly UserId $userId,
        private readonly Role $role,
        private readonly ?DateTimeImmutable $invitedAt,
        private ?DateTimeImmutable $acceptedAt,
    ) {}

    /**
     * Create a new pending membership (invited, not yet accepted).
     */
    public static function invite(
        WorkspaceId $workspaceId,
        UserId $userId,
        Role $role,
        DateTimeImmutable $invitedAt,
    ): self {
        return new self(
            workspaceId: $workspaceId,
            userId: $userId,
            role: $role,
            invitedAt: $invitedAt,
            acceptedAt: null,
        );
    }

    /**
     * Create an already-accepted membership (e.g. workspace owner at creation time).
     */
    public static function create(
        WorkspaceId $workspaceId,
        UserId $userId,
        Role $role,
        DateTimeImmutable $now,
    ): self {
        $membership = new self(
            workspaceId: $workspaceId,
            userId: $userId,
            role: $role,
            invitedAt: $now,
            acceptedAt: $now,
        );

        $membership->recordedEvents[] = new MemberJoined(
            workspaceId: $workspaceId,
            userId: $userId,
            role: $role,
            occurredAt: $now,
        );

        return $membership;
    }

    /**
     * Reconstitute from persistence without raising events.
     */
    public static function reconstitute(
        WorkspaceId $workspaceId,
        UserId $userId,
        Role $role,
        ?DateTimeImmutable $invitedAt,
        ?DateTimeImmutable $acceptedAt,
    ): self {
        return new self(
            workspaceId: $workspaceId,
            userId: $userId,
            role: $role,
            invitedAt: $invitedAt,
            acceptedAt: $acceptedAt,
        );
    }

    public function accept(DateTimeImmutable $now): void
    {
        if ($this->acceptedAt !== null) {
            return;
        }

        $this->acceptedAt = $now;

        $this->recordedEvents[] = new MemberJoined(
            workspaceId: $this->workspaceId,
            userId: $this->userId,
            role: $this->role,
            occurredAt: $now,
        );
    }

    public function isAccepted(): bool
    {
        return $this->acceptedAt !== null;
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

    public function getWorkspaceId(): WorkspaceId
    {
        return $this->workspaceId;
    }

    public function getUserId(): UserId
    {
        return $this->userId;
    }

    public function getRole(): Role
    {
        return $this->role;
    }

    public function getInvitedAt(): ?DateTimeImmutable
    {
        return $this->invitedAt;
    }

    public function getAcceptedAt(): ?DateTimeImmutable
    {
        return $this->acceptedAt;
    }
}
