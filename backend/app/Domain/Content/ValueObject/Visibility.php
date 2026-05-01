<?php

declare(strict_types=1);

namespace App\Domain\Content\ValueObject;

use InvalidArgumentException;

final readonly class Visibility
{
    private const PUBLIC    = 'public';
    private const UNLISTED  = 'unlisted';
    private const PRIVATE   = 'private';

    private const VALID_VALUES = [
        self::PUBLIC,
        self::UNLISTED,
        self::PRIVATE,
    ];

    private function __construct(
        public readonly string $value,
    ) {}

    public static function public(): self
    {
        return new self(self::PUBLIC);
    }

    public static function unlisted(): self
    {
        return new self(self::UNLISTED);
    }

    public static function private(): self
    {
        return new self(self::PRIVATE);
    }

    public static function fromString(string $value): self
    {
        if (!in_array($value, self::VALID_VALUES, true)) {
            throw new InvalidArgumentException(
                sprintf(
                    'Invalid visibility value "%s". Allowed: %s.',
                    $value,
                    implode(', ', self::VALID_VALUES)
                )
            );
        }

        return new self($value);
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
