<?php

declare(strict_types=1);

namespace App\Domain\Content\ValueObject;

use InvalidArgumentException;

final class Slug
{
    private const MAX_LENGTH = 200;
    private const PATTERN = '/^[a-z0-9]+(?:-[a-z0-9]+)*$/';

    private function __construct(
        private readonly string $value,
    ) {}

    public static function fromString(string $value): self
    {
        $trimmed = trim($value);

        if ($trimmed === '') {
            throw new InvalidArgumentException('Slug cannot be empty.');
        }

        if (strlen($trimmed) > self::MAX_LENGTH) {
            throw new InvalidArgumentException(
                sprintf('Slug exceeds maximum length of %d characters.', self::MAX_LENGTH)
            );
        }

        if (!preg_match(self::PATTERN, $trimmed)) {
            throw new InvalidArgumentException(
                "Slug must match pattern [a-z0-9-], got: {$trimmed}"
            );
        }

        return new self($trimmed);
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
