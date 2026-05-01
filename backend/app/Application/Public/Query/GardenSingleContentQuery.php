<?php

declare(strict_types=1);

namespace App\Application\Public\Query;

final class GardenSingleContentQuery
{
    public function __construct(
        public readonly string $workspaceSlug,
        public readonly string $contentSlug,
    ) {}
}
