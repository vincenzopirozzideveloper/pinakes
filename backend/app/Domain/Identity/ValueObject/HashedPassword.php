<?php

declare(strict_types=1);

namespace App\Domain\Identity\ValueObject;

use InvalidArgumentException;

final class HashedPassword
{
    private function __construct(
        private readonly string $hash,
    ) {
        if (empty(trim($hash))) {
            throw new InvalidArgumentException('Password hash cannot be empty.');
        }
    }

    /**
     * Wrap an already-hashed password string (e.g. from database).
     */
    public static function fromHash(string $hash): self
    {
        return new self($hash);
    }

    /**
     * Hash a plain-text password using bcrypt.
     */
    public static function fromPlainText(string $plainText): self
    {
        if (strlen($plainText) < 8) {
            throw new InvalidArgumentException('Password must be at least 8 characters.');
        }

        return new self(password_hash($plainText, PASSWORD_BCRYPT));
    }

    public function verify(string $plainText): bool
    {
        return password_verify($plainText, $this->hash);
    }

    public function toString(): string
    {
        return $this->hash;
    }

    public function __toString(): string
    {
        return $this->hash;
    }
}
