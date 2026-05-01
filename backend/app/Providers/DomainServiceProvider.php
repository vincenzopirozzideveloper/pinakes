<?php

declare(strict_types=1);

namespace App\Providers;

use App\Application\Workspace\WorkspaceContext;
use App\Domain\Identity\Repository\UserRepository;
use App\Domain\Shared\Bus\EventBus;
use App\Domain\Shared\Clock\Clock;
use App\Domain\Workspace\Repository\WorkspaceRepository;
use App\Infrastructure\Bus\LaravelEventBus;
use App\Infrastructure\Clock\SystemClock;
use App\Infrastructure\Persistence\Eloquent\Repository\UserEloquentRepository;
use App\Infrastructure\Persistence\Eloquent\Repository\WorkspaceEloquentRepository;
use Illuminate\Support\ServiceProvider;

final class DomainServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->scoped(WorkspaceContext::class);

        $this->app->bind(WorkspaceRepository::class, WorkspaceEloquentRepository::class);
        $this->app->bind(UserRepository::class, UserEloquentRepository::class);
        $this->app->bind(EventBus::class, LaravelEventBus::class);
        $this->app->bind(Clock::class, SystemClock::class);
    }

    public function boot(): void {}
}
