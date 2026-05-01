<?php

declare(strict_types=1);

namespace App\Domain\Workspace\ValueObject;

use InvalidArgumentException;

final class WorkspaceId
{
    private function __construct(
        private readonly int $value,
    ) {
        if ($value <= 0) {
            throw new InvalidArgumentException("WorkspaceId must be a positive integer, got: {$value}");
        }
    }

    public static function fromInt(int $value): self
    {
        return new self($value);
    }

    public function toInt(): int
    {
        return $this->value;
    }

    public function equals(self $other): bool
    {
        return $this->value === $other->value;
    }

    public function __toString(): string
    {
        return (string) $this->value;
    }
}
