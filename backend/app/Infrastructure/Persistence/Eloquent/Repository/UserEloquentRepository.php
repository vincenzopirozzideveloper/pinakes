<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Eloquent\Repository;

use App\Domain\Identity\Aggregate\User;
use App\Domain\Identity\Repository\UserRepository;
use App\Domain\Identity\ValueObject\Email;
use App\Domain\Identity\ValueObject\HashedPassword;
use App\Domain\Identity\ValueObject\UserId;
use App\Domain\Shared\ValueObject\Ulid;
use App\Infrastructure\Persistence\Eloquent\Model\UserModel;
use DateTimeImmutable;

final class UserEloquentRepository implements UserRepository
{
    public function findById(UserId $id): ?User
    {
        $model = UserModel::find($id->toInt());

        return $model ? $this->toDomain($model) : null;
    }

    public function findByEmail(Email $email): ?User
    {
        $model = UserModel::where('email', $email->toString())->first();

        return $model ? $this->toDomain($model) : null;
    }

    public function save(User $user): void
    {
        $data = [
            'ulid'          => $user->getUlid()->toString(),
            'name'          => $user->getName(),
            'email'         => $user->getEmail()->toString(),
            'password_hash' => $user->getPasswordHash()?->toString(),
        ];

        if ($user->getId()->toInt() === 0) {
            UserModel::create($data);
        } else {
            UserModel::where('id', $user->getId()->toInt())->update($data);
        }
    }

    private function toDomain(UserModel $model): User
    {
        return User::reconstitute(
            id: UserId::fromInt($model->id),
            ulid: Ulid::fromString($model->ulid),
            email: Email::fromString($model->email),
            name: $model->name,
            passwordHash: $model->password_hash
                ? HashedPassword::fromHash($model->password_hash)
                : null,
            createdAt: $model->created_at instanceof DateTimeImmutable
                ? $model->created_at
                : DateTimeImmutable::createFromMutable($model->created_at->toDateTime()),
        );
    }
}
