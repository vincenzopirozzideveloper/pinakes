<?php

declare(strict_types=1);

namespace App\Domain\Content\Aggregate;

use App\Domain\Content\Event\BookmarkSaved;
use App\Domain\Content\ValueObject\ContentId;
use App\Domain\Content\ValueObject\Excerpt;
use App\Domain\Content\ValueObject\Title;
use App\Domain\Content\ValueObject\Visibility;
use App\Domain\Identity\ValueObject\UserId;
use App\Domain\Shared\Bus\DomainEvent;
use App\Domain\Shared\Clock\Clock;
use App\Domain\Workspace\ValueObject\WorkspaceId;
use DateTimeImmutable;

final class Bookmark
{
    /** @var list<DomainEvent> */
    private array $recordedEvents = [];

    private function __construct(
        private readonly ContentId $id,
        private readonly WorkspaceId $workspaceId,
        private readonly UserId $authorId,
        private Title $title,
        private string $originalUrl,
        private Excerpt $excerpt,
        private Visibility $visibility,
        private readonly DateTimeImmutable $createdAt,
        private DateTimeImmutable $updatedAt,
    ) {}

    public static function save(
        ContentId $id,
        WorkspaceId $workspaceId,
        UserId $authorId,
        Title $title,
        string $originalUrl,
        Clock $clock,
    ): self {
        $now      = $clock->now();
        $bookmark = new self(
            id:          $id,
            workspaceId: $workspaceId,
            authorId:    $authorId,
            title:       $title,
            originalUrl: $originalUrl,
            excerpt:     Excerpt::empty(),
            visibility:  Visibility::private(),
            createdAt:   $now,
            updatedAt:   $now,
        );

        $bookmark->recordedEvents[] = new BookmarkSaved(
            contentId:   $id,
            workspaceId: $workspaceId,
            authorId:    $authorId,
            originalUrl: $originalUrl,
            occurredAt:  $now,
        );

        return $bookmark;
    }

    /**
     * Reconstitute a Bookmark aggregate from persistence state (no events raised).
     */
    public static function reconstitute(
        ContentId $id,
        WorkspaceId $workspaceId,
        UserId $authorId,
        Title $title,
        string $originalUrl,
        Excerpt $excerpt,
        Visibility $visibility,
        DateTimeImmutable $createdAt,
        DateTimeImmutable $updatedAt,
    ): self {
        return new self(
            id:          $id,
            workspaceId: $workspaceId,
            authorId:    $authorId,
            title:       $title,
            originalUrl: $originalUrl,
            excerpt:     $excerpt,
            visibility:  $visibility,
            createdAt:   $createdAt,
            updatedAt:   $updatedAt,
        );
    }

    /**
     * Pull and clear all recorded domain events.
     *
     * @return list<DomainEvent>
     */
    public function pullEvents(): array
    {
        $events               = $this->recordedEvents;
        $this->recordedEvents = [];

        return $events;
    }

    public function id(): ContentId { return $this->id; }
    public function workspaceId(): WorkspaceId { return $this->workspaceId; }
    public function authorId(): UserId { return $this->authorId; }
    public function title(): Title { return $this->title; }
    public function originalUrl(): string { return $this->originalUrl; }
    public function excerpt(): Excerpt { return $this->excerpt; }
    public function visibility(): Visibility { return $this->visibility; }
    public function createdAt(): DateTimeImmutable { return $this->createdAt; }
    public function updatedAt(): DateTimeImmutable { return $this->updatedAt; }
}
