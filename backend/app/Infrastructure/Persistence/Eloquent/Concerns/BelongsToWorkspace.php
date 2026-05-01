<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Eloquent\Concerns;

use App\Application\Workspace\WorkspaceContext;
use App\Infrastructure\Persistence\Eloquent\Scope\WorkspaceScope;

trait BelongsToWorkspace
{
    public static function bootBelongsToWorkspace(): void
    {
        static::addGlobalScope(new WorkspaceScope());

        static::creating(function (self $model): void {
            if (empty($model->workspace_id)) {
                $context = app(WorkspaceContext::class);

                if ($context->isSet()) {
                    $model->workspace_id = $context->workspaceId()->toInt();
                }
            }
        });
    }
}
