<?php

declare(strict_types=1);

namespace App\Interface\Http\Controller\Api\V1\Auth;

use App\Interface\Http\Resource\UserResource;
use App\Interface\Http\Resource\WorkspaceResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

final class MeController
{
    public function __invoke(Request $request): JsonResponse
    {
        /** @var \App\Infrastructure\Persistence\Eloquent\Model\UserModel $user */
        $user = $request->user();

        $defaultWorkspace = $user->defaultWorkspace();

        $memberships = $user->workspaces()
            ->wherePivotNotNull('accepted_at')
            ->get();

        return response()->json([
            'data' => [
                'user'              => new UserResource($user),
                'default_workspace' => $defaultWorkspace
                    ? new WorkspaceResource($defaultWorkspace)
                    : null,
                'workspaces'        => WorkspaceResource::collection($memberships),
            ],
        ]);
    }
}
