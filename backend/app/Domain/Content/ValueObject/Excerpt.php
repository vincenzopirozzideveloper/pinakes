<?php

declare(strict_types=1);

namespace App\Domain\Content\ValueObject;

use InvalidArgumentException;

final class Excerpt
{
    private const MAX_LENGTH = 1000;

    private function __construct(
        private readonly string $value,
    ) {}

    public static function fromString(string $value): self
    {
        $trimmed = trim($value);

        if (strlen($trimmed) > self::MAX_LENGTH) {
            throw new InvalidArgumentException(
                sprintf('Excerpt exceeds maximum length of %d characters.', self::MAX_LENGTH)
            );
        }

        return new self($trimmed);
    }

    public static function empty(): self
    {
        return new self('');
    }

    public function toString(): string
    {
        return $this->value;
    }

    public function isEmpty(): bool
    {
        return $this->value === '';
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
