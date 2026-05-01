<?php

declare(strict_types=1);

namespace App\Interface\Http\Resource;

use App\Infrastructure\Persistence\Eloquent\Model\UserModel;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property UserModel $resource
 */
final class UserResource extends JsonResource
{
    /** @return array<string, mixed> */
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->resource->ulid,
            'name'       => $this->resource->name,
            'email'      => $this->resource->email,
            'locale'     => $this->resource->locale,
            'timezone'   => $this->resource->timezone,
            'avatar_url' => $this->resource->avatar_url,
            'created_at' => $this->resource->created_at?->toIso8601String(),
        ];
    }
}
