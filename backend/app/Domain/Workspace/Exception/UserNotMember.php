<?php

declare(strict_types=1);

namespace App\Domain\Workspace\Exception;

use App\Domain\Identity\ValueObject\UserId;
use App\Domain\Workspace\ValueObject\WorkspaceId;
use RuntimeException;

final class UserNotMember extends RuntimeException
{
    public function __construct(
        public readonly UserId $userId,
        public readonly WorkspaceId $workspaceId,
    ) {
        parent::__construct(
            "User #{$userId} is not a member of workspace #{$workspaceId}."
        );
    }
}
