<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Eloquent\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class WorkspaceMemberModel extends Model
{
    protected $table = 'workspace_members';

    protected $fillable = [
        'workspace_id',
        'user_id',
        'role',
        'invited_at',
        'accepted_at',
    ];

    protected function casts(): array
    {
        return [
            'invited_at'  => 'datetime',
            'accepted_at' => 'datetime',
            'created_at'  => 'datetime',
            'updated_at'  => 'datetime',
        ];
    }

    public function workspace(): BelongsTo
    {
        return $this->belongsTo(WorkspaceModel::class, 'workspace_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(UserModel::class, 'user_id');
    }
}
