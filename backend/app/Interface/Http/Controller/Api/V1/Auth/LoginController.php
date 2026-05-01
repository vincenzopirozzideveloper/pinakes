<?php

declare(strict_types=1);

namespace App\Interface\Http\Controller\Api\V1\Auth;

use App\Interface\Http\Request\Auth\LoginRequest;
use App\Interface\Http\Resource\UserResource;
use App\Interface\Http\Resource\WorkspaceResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

final class LoginController
{
    public function __invoke(LoginRequest $request): JsonResponse
    {
        $credentials = [
            'email'    => $request->validated('email'),
            'password' => $request->validated('password'),
        ];

        if (!Auth::guard('web')->attempt($credentials, remember: false)) {
            return response()->json([
                'message' => 'Invalid credentials.',
            ], 401);
        }

        $request->session()->regenerate();

        /** @var \App\Infrastructure\Persistence\Eloquent\Model\UserModel $user */
        $user = Auth::guard('web')->user();

        $defaultWorkspace = $user->defaultWorkspace();

        return response()->json([
            'data' => [
                'user'      => new UserResource($user),
                'workspace' => $defaultWorkspace
                    ? new WorkspaceResource($defaultWorkspace)
                    : null,
            ],
        ]);
    }
}
