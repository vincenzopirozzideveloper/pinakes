<?php

declare(strict_types=1);

namespace App\Providers;

use App\Application\Workspace\WorkspaceContext;
use App\Domain\Content\Repository\BookmarkRepository;
use App\Domain\Content\Repository\NoteRepository;
use App\Domain\Content\Repository\PostRepository;
use App\Domain\Shared\Bus\EventBus;
use App\Domain\Shared\Clock\Clock;
use App\Infrastructure\Bus\LaravelEventBus;
use App\Infrastructure\Clock\SystemClock;
use App\Infrastructure\Persistence\Eloquent\Repository\NoteEloquentRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(Clock::class, SystemClock::class);
        $this->app->singleton(EventBus::class, LaravelEventBus::class);
        $this->app->singleton(WorkspaceContext::class);

        $this->app->bind(NoteRepository::class, NoteEloquentRepository::class);
    }

    public function boot(): void
    {
    }
}
