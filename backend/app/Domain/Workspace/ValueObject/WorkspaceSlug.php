<?php

declare(strict_types=1);

namespace App\Domain\Workspace\ValueObject;

use InvalidArgumentException;

final class WorkspaceSlug
{
    private function __construct(
        private readonly string $value,
    ) {
        if (!preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $value)) {
            throw new InvalidArgumentException(
                "Invalid workspace slug '{$value}'. Must be lowercase alphanumeric with hyphens."
            );
        }

        if (strlen($value) < 2 || strlen($value) > 80) {
            throw new InvalidArgumentException(
                "Workspace slug must be between 2 and 80 characters."
            );
        }
    }

    public static function fromString(string $value): self
    {
        return new self(strtolower(trim($value)));
    }

    public function toString(): string
    {
        return $this->value;
    }

    public function equals(self $other): bool
    {
        return $this->value === $other->value;
    }

    public function __toString(): string
    {
        return $this->value;
    }
}
