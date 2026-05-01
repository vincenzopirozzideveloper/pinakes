<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

final class WorkspaceModel extends Model
{
    use HasFactory;

    protected $table = 'workspaces';

    protected $fillable = [
        'ulid',
        'owner_user_id',
        'name',
        'slug',
        'plan',
        'logo_url',
        'settings',
    ];

    protected function casts(): array
    {
        return [
            'settings'     => 'array',
            'suspended_at' => 'datetime',
            'created_at'   => 'datetime',
            'updated_at'   => 'datetime',
        ];
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(UserModel::class, 'owner_user_id');
    }

    public function members(): BelongsToMany
    {
        return $this->belongsToMany(
            UserModel::class,
            'workspace_members',
            'workspace_id',
            'user_id',
        )->withPivot(['role', 'invited_at', 'accepted_at'])->withTimestamps();
    }

    public function memberRecords(): HasMany
    {
        return $this->hasMany(WorkspaceMemberModel::class, 'workspace_id');
    }
}
