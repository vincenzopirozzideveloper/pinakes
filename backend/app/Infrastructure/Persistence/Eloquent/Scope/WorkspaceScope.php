<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Eloquent\Scope;

use App\Application\Workspace\WorkspaceContext;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

final class WorkspaceScope implements Scope
{
    public function apply(Builder $builder, Model $model): void
    {
        $context = app(WorkspaceContext::class);

        if ($context->isSet()) {
            $builder->where($model->getTable() . '.workspace_id', $context->workspaceId()->toInt());
        }
    }
}
