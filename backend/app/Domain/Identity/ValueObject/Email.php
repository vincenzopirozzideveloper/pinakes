<?php

declare(strict_types=1);

namespace App\Domain\Identity\ValueObject;

use InvalidArgumentException;

final class Email
{
    private readonly string $value;

    private function __construct(string $value)
    {
        $normalized = strtolower(trim($value));

        if (!filter_var($normalized, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException("Invalid email address: {$value}");
        }

        $this->value = $normalized;
    }

    public static function fromString(string $value): self
    {
        return new self($value);
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
