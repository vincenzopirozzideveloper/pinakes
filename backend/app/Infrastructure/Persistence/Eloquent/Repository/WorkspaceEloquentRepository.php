<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Eloquent\Repository;

use App\Domain\Identity\ValueObject\UserId;
use App\Domain\Workspace\Aggregate\Workspace;
use App\Domain\Workspace\Repository\WorkspaceRepository;
use App\Domain\Workspace\ValueObject\WorkspaceId;
use App\Domain\Workspace\ValueObject\WorkspaceSlug;
use App\Infrastructure\Persistence\Eloquent\Model\WorkspaceModel;
use App\Domain\Shared\ValueObject\Ulid;

final class WorkspaceEloquentRepository implements WorkspaceRepository
{
    public function findById(WorkspaceId $id): ?Workspace
    {
        $model = WorkspaceModel::find($id->toInt());

        return $model ? $this->toDomain($model) : null;
    }

    public function findBySlug(WorkspaceSlug $slug): ?Workspace
    {
        $model = WorkspaceModel::where('slug', $slug->toString())->first();

        return $model ? $this->toDomain($model) : null;
    }

    public function findByOwner(UserId $ownerUserId): array
    {
        return WorkspaceModel::where('owner_user_id', $ownerUserId->toInt())
            ->get()
            ->map(fn(WorkspaceModel $m) => $this->toDomain($m))
            ->all();
    }

    public function save(Workspace $workspace): void
    {
        WorkspaceModel::updateOrCreate(
            ['id' => $workspace->getId()->toInt()],
            [
                'ulid'          => $workspace->getUlid()->toString(),
                'owner_user_id' => $workspace->getOwnerUserId()->toInt(),
                'name'          => $workspace->getName(),
                'slug'          => $workspace->getSlug()->toString(),
                'plan'          => $workspace->getPlan(),
            ],
        );
    }

    private function toDomain(WorkspaceModel $model): Workspace
    {
        return Workspace::reconstitute(
            id: WorkspaceId::fromInt($model->id),
            ulid: Ulid::fromString($model->ulid),
            ownerUserId: UserId::fromInt($model->owner_user_id),
            slug: WorkspaceSlug::fromString($model->slug),
            name: $model->name,
            plan: $model->plan,
            createdAt: $model->created_at->toDateTimeImmutable(),
        );
    }
}
