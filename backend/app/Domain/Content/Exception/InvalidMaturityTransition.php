<?php

declare(strict_types=1);

namespace App\Domain\Content\Exception;

use App\Domain\Content\ValueObject\Maturity;
use RuntimeException;

final class InvalidMaturityTransition extends RuntimeException
{
    public function __construct(Maturity $from, Maturity $to)
    {
        parent::__construct(
            sprintf(
                'Cannot transition maturity from "%s" to "%s".',
                $from->value,
                $to->value
            )
        );
    }
}
