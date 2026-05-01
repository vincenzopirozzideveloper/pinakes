<?php

declare(strict_types=1);

namespace App\Application\Content\Command;

use Spatie\LaravelData\Data;

final class CreateNoteCommand extends Data
{
    public function __construct(
        public readonly string $title,
        public readonly string $body,
        public readonly ?string $slug = null,
        public readonly ?string $idempotencyKey = null,
    ) {}
}
