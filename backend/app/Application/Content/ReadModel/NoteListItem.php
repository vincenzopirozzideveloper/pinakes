<?php

declare(strict_types=1);

namespace App\Application\Content\ReadModel;

use DateTimeImmutable;

final class NoteListItem
{
    public function __construct(
        public readonly string $id,
        public readonly string $title,
        public readonly string $slug,
        public readonly string $excerpt,
        public readonly string $maturity,
        public readonly string $visibility,
        public readonly DateTimeImmutable $createdAt,
        public readonly DateTimeImmutable $updatedAt,
    ) {}
}
