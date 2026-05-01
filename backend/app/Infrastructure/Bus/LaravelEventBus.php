<?php

declare(strict_types=1);

namespace App\Infrastructure\Bus;

use App\Domain\Shared\Bus\DomainEvent;
use App\Domain\Shared\Bus\EventBus;
use Illuminate\Contracts\Events\Dispatcher;

final class LaravelEventBus implements EventBus
{
    public function __construct(
        private readonly Dispatcher $dispatcher,
    ) {}

    public function dispatch(DomainEvent ...$events): void
    {
        foreach ($events as $event) {
            $this->dispatcher->dispatch($event);
        }
    }
}
