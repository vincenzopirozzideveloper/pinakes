<?php

declare(strict_types=1);

namespace App\Domain\Content\Aggregate;

use App\Domain\Content\Event\PostCreated;
use App\Domain\Content\ValueObject\ContentId;
use App\Domain\Content\ValueObject\Excerpt;
use App\Domain\Content\ValueObject\Markdown;
use App\Domain\Content\ValueObject\Maturity;
use App\Domain\Content\ValueObject\Slug;
use App\Domain\Content\ValueObject\Title;
use App\Domain\Content\ValueObject\Visibility;
use App\Domain\Identity\ValueObject\UserId;
use App\Domain\Shared\Bus\DomainEvent;
use App\Domain\Shared\Clock\Clock;
use App\Domain\Workspace\ValueObject\WorkspaceId;
use DateTimeImmutable;

final class Post
{
    /** @var list<DomainEvent> */
    private array $recordedEvents = [];

    private function __construct(
        private readonly ContentId $id,
        private readonly WorkspaceId $workspaceId,
        private readonly UserId $authorId,
        private Title $title,
        private Slug $slug,
        private Markdown $body,
        private Excerpt $excerpt,
        private Maturity $maturity,
        private Visibility $visibility,
        private readonly DateTimeImmutable $createdAt,
        private DateTimeImmutable $updatedAt,
    ) {}

    public static function create(
        ContentId $id,
        WorkspaceId $workspaceId,
        UserId $authorId,
        Title $title,
        Slug $slug,
        Markdown $body,
        Clock $clock,
    ): self {
        $now  = $clock->now();
        $post = new self(
            id:          $id,
            workspaceId: $workspaceId,
            authorId:    $authorId,
            title:       $title,
            slug:        $slug,
            body:        $body,
            excerpt:     Excerpt::empty(),
            maturity:    Maturity::seedling(),
            visibility:  Visibility::private(),
            createdAt:   $now,
            updatedAt:   $now,
        );

        $post->recordedEvents[] = new PostCreated(
            contentId:   $id,
            workspaceId: $workspaceId,
            authorId:    $authorId,
            title:       $title,
            occurredAt:  $now,
        );

        return $post;
    }

    /**
     * Reconstitute a Post aggregate from persistence state (no events raised).
     */
    public static function reconstitute(
        ContentId $id,
        WorkspaceId $workspaceId,
        UserId $authorId,
        Title $title,
        Slug $slug,
        Markdown $body,
        Excerpt $excerpt,
        Maturity $maturity,
        Visibility $visibility,
        DateTimeImmutable $createdAt,
        DateTimeImmutable $updatedAt,
    ): self {
        return new self(
            id:          $id,
            workspaceId: $workspaceId,
            authorId:    $authorId,
            title:       $title,
            slug:        $slug,
            body:        $body,
            excerpt:     $excerpt,
            maturity:    $maturity,
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
    public function slug(): Slug { return $this->slug; }
    public function body(): Markdown { return $this->body; }
    public function excerpt(): Excerpt { return $this->excerpt; }
    public function maturity(): Maturity { return $this->maturity; }
    public function visibility(): Visibility { return $this->visibility; }
    public function createdAt(): DateTimeImmutable { return $this->createdAt; }
    public function updatedAt(): DateTimeImmutable { return $this->updatedAt; }
}
