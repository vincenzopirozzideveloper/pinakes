<?php

declare(strict_types=1);

namespace App\Domain\Content\ValueObject;

use InvalidArgumentException;

/**
 * Value Object representing the maturity stage of a content item.
 *
 * Allowed transitions:
 *   seedling -> budding
 *   budding  -> evergreen
 *   any      -> archived
 *   archived -> (nothing)
 */
final readonly class Maturity
{
    private const SEEDLING  = 'seedling';
    private const BUDDING   = 'budding';
    private const EVERGREEN = 'evergreen';
    private const ARCHIVED  = 'archived';

    private const VALID_VALUES = [
        self::SEEDLING,
        self::BUDDING,
        self::EVERGREEN,
        self::ARCHIVED,
    ];

    /**
     * Ordered progression (excludes archived — it is a terminal state reachable from anywhere).
     *
     * @var list<string>
     */
    private const PROGRESSION = [
        self::SEEDLING,
        self::BUDDING,
        self::EVERGREEN,
    ];

    private function __construct(
        public readonly string $value,
    ) {}

    public static function seedling(): self
    {
        return new self(self::SEEDLING);
    }

    public static function budding(): self
    {
        return new self(self::BUDDING);
    }

    public static function evergreen(): self
    {
        return new self(self::EVERGREEN);
    }

    public static function archived(): self
    {
        return new self(self::ARCHIVED);
    }

    public static function fromString(string $value): self
    {
        if (!in_array($value, self::VALID_VALUES, true)) {
            throw new InvalidArgumentException(
                sprintf(
                    'Invalid maturity value "%s". Allowed: %s.',
                    $value,
                    implode(', ', self::VALID_VALUES)
                )
            );
        }

        return new self($value);
    }

    public function canTransitionTo(self $next): bool
    {
        if ($this->value === self::ARCHIVED) {
            return false;
        }

        if ($next->value === self::ARCHIVED) {
            return true;
        }

        $currentIndex = array_search($this->value, self::PROGRESSION, true);
        $nextIndex    = array_search($next->value, self::PROGRESSION, true);

        if ($currentIndex === false || $nextIndex === false) {
            return false;
        }

        return $nextIndex === $currentIndex + 1;
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
