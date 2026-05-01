<?php

declare(strict_types=1);

namespace App\Application\Workspace;

use App\Domain\Identity\ValueObject\UserId;
use App\Domain\Workspace\ValueObject\WorkspaceId;
use RuntimeException;

final class WorkspaceContext
{
    private ?WorkspaceId $workspaceId = null;
    private ?UserId $userId = null;

    public function set(WorkspaceId $workspaceId, UserId $userId): void
    {
        $this->workspaceId = $workspaceId;
        $this->userId = $userId;
    }

    /**
     * @throws RuntimeException if context has not been set
     */
    public function workspaceId(): WorkspaceId
    {
        if ($this->workspaceId === null) {
            throw new RuntimeException('WorkspaceContext has not been initialized for this request.');
        }

        return $this->workspaceId;
    }

    /**
     * @throws RuntimeException if context has not been set
     */
    public function userId(): UserId
    {
        if ($this->userId === null) {
            throw new RuntimeException('WorkspaceContext has not been initialized for this request.');
        }

        return $this->userId;
    }

    public function isSet(): bool
    {
        return $this->workspaceId !== null && $this->userId !== null;
    }
}
