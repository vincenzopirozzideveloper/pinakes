<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

final class UserModel extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;

    protected $table = 'users';

    protected $fillable = [
        'ulid',
        'name',
        'email',
        'email_verified_at',
        'password_hash',
        'avatar_url',
        'locale',
        'timezone',
    ];

    protected $hidden = [
        'password_hash',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'deactivated_at'    => 'datetime',
            'created_at'        => 'datetime',
            'updated_at'        => 'datetime',
        ];
    }

    /**
     * Required by Authenticatable contract — maps to our password_hash column.
     */
    public function getAuthPassword(): string
    {
        return (string) $this->attributes['password_hash'];
    }

    public function workspaces(): BelongsToMany
    {
        return $this->belongsToMany(
            WorkspaceModel::class,
            'workspace_members',
            'user_id',
            'workspace_id',
        )->withPivot(['role', 'invited_at', 'accepted_at'])->withTimestamps();
    }

    public function ownedWorkspaces(): HasMany
    {
        return $this->hasMany(WorkspaceModel::class, 'owner_user_id');
    }

    /**
     * The user's default workspace is the first workspace they own.
     */
    public function defaultWorkspace(): ?WorkspaceModel
    {
        return $this->ownedWorkspaces()->orderBy('id')->first();
    }
}
