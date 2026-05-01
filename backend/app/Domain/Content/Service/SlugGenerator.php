<?php

declare(strict_types=1);

namespace App\Domain\Content\Service;

use App\Domain\Content\Repository\NoteRepository;
use App\Domain\Content\ValueObject\Slug;
use App\Domain\Workspace\ValueObject\WorkspaceId;
use Illuminate\Support\Str;

final class SlugGenerator
{
    public function __construct(
        private readonly NoteRepository $noteRepository,
    ) {}

    /**
     * Generate a unique slug for a given title within a workspace.
     *
     * When a custom slug is provided it is used as the base; otherwise the
     * title is converted to kebab-case via Laravel's Str::slug helper.
     * Numeric suffixes (-2, -3, …) are appended until uniqueness is achieved.
     */
    public function forTitle(WorkspaceId $workspaceId, string $title, ?string $custom = null): Slug
    {
        $base = $custom !== null && $custom !== ''
            ? Str::slug($custom)
            : Str::slug($title);

        $candidate = $base;
        $suffix    = 2;

        while ($this->noteRepository->existsBySlug($workspaceId, Slug::fromString($candidate))) {
            $candidate = "{$base}-{$suffix}";
            $suffix++;
        }

        return Slug::fromString($candidate);
    }
}
