<?php

declare(strict_types=1);

namespace App\Interface\Http\Resource;

use App\Infrastructure\Persistence\Eloquent\Model\WorkspaceModel;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property WorkspaceModel $resource
 */
final class WorkspaceResource extends JsonResource
{
    /** @return array<string, mixed> */
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->resource->ulid,
            'name'       => $this->resource->name,
            'slug'       => $this->resource->slug,
            'plan'       => $this->resource->plan,
            'logo_url'   => $this->resource->logo_url,
            'created_at' => $this->resource->created_at?->toIso8601String(),
        ];
    }
}
