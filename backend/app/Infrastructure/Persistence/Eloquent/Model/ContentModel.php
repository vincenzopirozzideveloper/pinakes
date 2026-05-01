<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class ContentModel extends Model
{
    use HasFactory;

    protected $table = 'contents';

    protected $fillable = [
        'ulid',
        'workspace_id',
        'created_by',
        'status_id',
        'source_id',
        'type',
        'visibility',
        'title',
        'slug',
        'excerpt',
        'body',
        'cover_url',
        'original_url',
        'language',
        'meta',
        'read_time_minutes',
        'published_at',
        'archived_at',
    ];

    protected function casts(): array
    {
        return [
            'meta'         => 'array',
            'published_at' => 'datetime',
            'archived_at'  => 'datetime',
            'created_at'   => 'datetime',
            'updated_at'   => 'datetime',
        ];
    }

    public function workspace(): BelongsTo
    {
        return $this->belongsTo(WorkspaceModel::class, 'workspace_id');
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(UserModel::class, 'created_by');
    }
}
