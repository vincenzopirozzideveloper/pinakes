<?php

declare(strict_types=1);

namespace App\Domain\Workspace\ValueObject;

use InvalidArgumentException;

final class Role
{
    private const ALLOWED = ['owner', 'editor', 'viewer'];

    private function __construct(
        private readonly string $value,
    ) {
        if (!in_array($value, self::ALLOWED, strict: true)) {
            throw new InvalidArgumentException(
                "Invalid role '{$value}'. Allowed: " . implode(', ', self::ALLOWED)
            );
        }
    }

    public static function owner(): self
    {
        return new self('owner');
    }

    public static function editor(): self
    {
        return new self('editor');
    }

    public static function viewer(): self
    {
        return new self('viewer');
    }

    public static function fromString(string $value): self
    {
        return new self($value);
    }

    public function isOwner(): bool
    {
        return $this->value === 'owner';
    }

    public function isEditor(): bool
    {
        return $this->value === 'editor';
    }

    public function canWrite(): bool
    {
        return in_array($this->value, ['owner', 'editor'], strict: true);
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
