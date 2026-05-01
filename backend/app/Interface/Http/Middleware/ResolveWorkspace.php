<?php

declare(strict_types=1);

namespace App\Interface\Http\Middleware;

use App\Application\Workspace\WorkspaceContext;
use App\Domain\Identity\ValueObject\UserId;
use App\Domain\Workspace\ValueObject\WorkspaceId;
use App\Infrastructure\Persistence\Eloquent\Model\UserModel;
use App\Infrastructure\Persistence\Eloquent\Model\WorkspaceModel;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

final class ResolveWorkspace
{
    public function __construct(
        private readonly WorkspaceContext $context,
    ) {}

    public function handle(Request $request, Closure $next): Response
    {
        /** @var UserModel|null $user */
        $user = $request->user();

        if ($user === null) {
            abort(401, 'Unauthenticated.');
        }

        $slug = $request->route('workspace');

        $workspace = $slug
            ? WorkspaceModel::where('slug', $slug)->firstOrFail()
            : $user->defaultWorkspace();

        if ($workspace === null) {
            abort(404, 'No workspace found for this user.');
        }

        $isMember = $workspace->members()
            ->where('user_id', $user->id)
            ->whereNotNull('workspace_members.accepted_at')
            ->exists();

        abort_unless($isMember, 403, 'You are not a member of this workspace.');

        $this->context->set(
            WorkspaceId::fromInt($workspace->id),
            UserId::fromInt($user->id),
        );

        return $next($request);
    }
}
