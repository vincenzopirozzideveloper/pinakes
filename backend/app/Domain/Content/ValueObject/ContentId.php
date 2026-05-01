<?php

declare(strict_types=1);

namespace App\Domain\Content\ValueObject;

use App\Domain\Shared\ValueObject\Ulid;

final class ContentId
{
    private function __construct(
        private readonly Ulid $ulid,
    ) {}

    public static function generate(): self
    {
        return new self(Ulid::generate());
    }

    public static function fromString(string $value): self
    {
        return new self(Ulid::fromString($value));
    }

    public function toString(): string
    {
        return $this->ulid->toString();
    }

    public function equals(self $other): bool
    {
        return $this->ulid->equals($other->ulid);
    }

    public function __toString(): string
    {
        return $this->ulid->toString();
    }
}
