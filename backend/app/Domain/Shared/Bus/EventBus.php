<?php

declare(strict_types=1);

namespace App\Domain\Shared\Bus;

interface EventBus
{
    /**
     * Dispatch one or more domain events.
     *
     * @param DomainEvent ...$events
     */
    public function dispatch(DomainEvent ...$events): void;
}
