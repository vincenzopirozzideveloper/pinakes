<?php

declare(strict_types=1);

namespace App\Domain\Content\ValueObject;

use InvalidArgumentException;

final readonly class ContentType
{
    private const NOTE     = 'note';
    private const POST     = 'post';
    private const BOOKMARK = 'bookmark';
    private const ARTICLE  = 'article';
    private const JOURNAL  = 'journal';

    private const VALID_VALUES = [
        self::NOTE,
        self::POST,
        self::BOOKMARK,
        self::ARTICLE,
        self::JOURNAL,
    ];

    private function __construct(
        public readonly string $value,
    ) {}

    public static function note(): self
    {
        return new self(self::NOTE);
    }

    public static function post(): self
    {
        return new self(self::POST);
    }

    public static function bookmark(): self
    {
        return new self(self::BOOKMARK);
    }

    public static function article(): self
    {
        return new self(self::ARTICLE);
    }

    public static function journal(): self
    {
        return new self(self::JOURNAL);
    }

    public static function fromString(string $value): self
    {
        if (!in_array($value, self::VALID_VALUES, true)) {
            throw new InvalidArgumentException(
                sprintf(
                    'Invalid content type "%s". Allowed: %s.',
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
