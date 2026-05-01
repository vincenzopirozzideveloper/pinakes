<?php

declare(strict_types=1);

namespace App\Interface\Http\Request\Content;

use Illuminate\Foundation\Http\FormRequest;

final class UpdateNoteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'title'   => ['required', 'string', 'min:1', 'max:500'],
            'body'    => ['required', 'string', 'max:200000'],
            'excerpt' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
