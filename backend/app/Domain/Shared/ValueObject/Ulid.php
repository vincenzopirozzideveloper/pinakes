<?php

declare(strict_types=1);

namespace App\Domain\Shared\ValueObject;

use Symfony\Component\Uid\Ulid as SymfonyUlid;
use InvalidArgumentException;

final class Ulid
{
    private string $value;

    private function __construct(string $value)
    {
        if (!SymfonyUlid::isValid($value)) {
            throw new InvalidArgumentException("Invalid ULID: {$value}");
        }
        $this->value = strtoupper($value);
    }

    public static function generate(): self
    {
        return new self((string) new SymfonyUlid());
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
