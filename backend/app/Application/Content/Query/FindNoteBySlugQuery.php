<?php

declare(strict_types=1);

namespace App\Application\Content\Query;

final class FindNoteBySlugQuery
{
    public function __construct(
        public readonly int $workspaceId,
        public readonly string $slug,
    ) {}
}
