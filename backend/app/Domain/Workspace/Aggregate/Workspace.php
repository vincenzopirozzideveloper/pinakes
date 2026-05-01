<?php

declare(strict_types=1);

namespace App\Domain\Workspace\Aggregate;

use App\Domain\Identity\ValueObject\UserId;
use App\Domain\Shared\Bus\DomainEvent;
use App\Domain\Shared\ValueObject\Ulid;
use App\Domain\Workspace\Event\MemberInvited;
use App\Domain\Workspace\Event\WorkspaceCreated;
use App\Domain\Workspace\Exception\UserNotMember;
use App\Domain\Workspace\ValueObject\Role;
use App\Domain\Workspace\ValueObject\WorkspaceId;
use App\Domain\Workspace\ValueObject\WorkspaceSlug;
use DateTimeImmutable;

final class Workspace
{
    /** @var DomainEvent[] */
    private array $recordedEvents = [];

    /** @var Membership[] */
    private array $memberships = [];

    private function __construct(
        private readonly WorkspaceId $id,
        private readonly Ulid $ulid,
        private readonly UserId $ownerUserId,
        private readonly WorkspaceSlug $slug,
        private string $name,
        private readonly string $plan,
        private readonly DateTimeImmutable $createdAt,
    ) {}

    /**
     * Create a new workspace and record the WorkspaceCreated event.
     */
    public static function create(
        WorkspaceId $id,
        Ulid $ulid,
        UserId $ownerUserId,
        WorkspaceSlug $slug,
        string $name,
        string $plan,
        DateTimeImmutable $now,
    ): self {
        $workspace = new self(
            id: $id,
            ulid: $ulid,
            ownerUserId: $ownerUserId,
            slug: $slug,
            name: $name,
            plan: $plan,
            createdAt: $now,
        );

        $workspace->recordedEvents[] = new WorkspaceCreated(
            workspaceId: $id,
            slug: $slug,
            ownerUserId: $ownerUserId,
            name: $name,
            occurredAt: $now,
        );

        $ownerMembership = Membership::create(
            workspaceId: $id,
            userId: $ownerUserId,
            role: Role::owner(),
            now: $now,
        );

        $workspace->memberships[] = $ownerMembership;

        return $workspace;
    }

    /**
     * Reconstitute from persistence without raising events.
     */
    public static function reconstitute(
        WorkspaceId $id,
        Ulid $ulid,
        UserId $ownerUserId,
        WorkspaceSlug $slug,
        string $name,
        string $plan,
        DateTimeImmutable $createdAt,
    ): self {
        return new self(
            id: $id,
            ulid: $ulid,
            ownerUserId: $ownerUserId,
            slug: $slug,
            name: $name,
            plan: $plan,
            createdAt: $createdAt,
        );
    }

    /**
     * Invite a user to this workspace, raising MemberInvited event.
     */
    public function inviteMember(
        UserId $invitedUserId,
        UserId $invitedByUserId,
        Role $role,
        DateTimeImmutable $now,
    ): Membership {
        $this->assertIsMember($invitedByUserId);

        $membership = Membership::invite(
            workspaceId: $this->id,
            userId: $invitedUserId,
            role: $role,
            invitedAt: $now,
        );

        $this->memberships[] = $membership;

        $this->recordedEvents[] = new MemberInvited(
            workspaceId: $this->id,
            invitedUserId: $invitedUserId,
            invitedByUserId: $invitedByUserId,
            role: $role,
            occurredAt: $now,
        );

        return $membership;
    }

    /**
     * @throws UserNotMember
     */
    private function assertIsMember(UserId $userId): void
    {
        foreach ($this->memberships as $membership) {
            if ($membership->getUserId()->equals($userId) && $membership->isAccepted()) {
                return;
            }
        }

        throw new UserNotMember($userId, $this->id);
    }

    /**
     * Pull and clear all recorded domain events (including sub-aggregate events).
     *
     * @return DomainEvent[]
     */
    public function pullEvents(): array
    {
        $events = $this->recordedEvents;
        $this->recordedEvents = [];

        foreach ($this->memberships as $membership) {
            foreach ($membership->pullEvents() as $membershipEvent) {
                $events[] = $membershipEvent;
            }
        }

        return $events;
    }

    public function getId(): WorkspaceId
    {
        return $this->id;
    }

    public function getUlid(): Ulid
    {
        return $this->ulid;
    }

    public function getOwnerUserId(): UserId
    {
        return $this->ownerUserId;
    }

    public function getSlug(): WorkspaceSlug
    {
        return $this->slug;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getPlan(): string
    {
        return $this->plan;
    }

    public function getCreatedAt(): DateTimeImmutable
    {
        return $this->createdAt;
    }
}
