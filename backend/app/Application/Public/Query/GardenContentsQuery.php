<?php

declare(strict_types=1);

namespace App\Application\Public\Query;

final class GardenContentsQuery
{
    public function __construct(
        public readonly string $workspaceSlug,
        public readonly ?string $type    = null,
        public readonly ?string $topic   = null,
        public readonly ?string $tag     = null,
        public readonly ?string $search  = null,
        public readonly string  $sort    = 'latest',
        public readonly int     $page    = 1,
        public readonly int     $perPage = 20,
    ) {}
}
