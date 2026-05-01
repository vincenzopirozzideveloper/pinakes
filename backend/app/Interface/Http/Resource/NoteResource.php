<?php

declare(strict_types=1);

namespace App\Interface\Http\Resource;

use App\Domain\Content\Aggregate\Note;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Note
 */
final class NoteResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        /** @var Note $note */
        $note = $this->resource;

        return [
            'id'         => $note->id()->toString(),
            'title'      => $note->title()->toString(),
            'slug'       => $note->slug()->toString(),
            'body'       => $note->body()->toString(),
            'excerpt'    => $note->excerpt()->isEmpty() ? null : $note->excerpt()->toString(),
            'maturity'   => $note->maturity()->value,
            'visibility' => $note->visibility()->value,
            'created_at' => $note->createdAt()->format('Y-m-d\TH:i:s\Z'),
            'updated_at' => $note->updatedAt()->format('Y-m-d\TH:i:s\Z'),
        ];
    }
}
