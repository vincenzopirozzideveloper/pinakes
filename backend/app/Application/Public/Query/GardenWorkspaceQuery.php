<?php

declare(strict_types=1);

namespace App\Application\Public\Query;

final class GardenWorkspaceQuery
{
    public function __construct(
        public readonly string $workspaceSlug,
    ) {}
}
