<?php

declare(strict_types=1);

namespace App\Domain\Content\Exception;

use App\Domain\Content\ValueObject\Slug;
use RuntimeException;

final class SlugAlreadyTaken extends RuntimeException
{
    public function __construct(Slug $slug)
    {
        parent::__construct(
            sprintf('Slug "%s" is already taken in this workspace.', $slug->toString())
        );
    }
}
