<?php

declare(strict_types=1);

namespace App\Domain\Identity\Repository;

use App\Domain\Identity\Aggregate\User;
use App\Domain\Identity\ValueObject\Email;
use App\Domain\Identity\ValueObject\UserId;

interface UserRepository
{
    public function findById(UserId $id): ?User;

    public function findByEmail(Email $email): ?User;

    public function save(User $user): void;
}
