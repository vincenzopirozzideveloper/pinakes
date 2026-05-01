<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Content;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Symfony\Component\Uid\Ulid;

/**
 * @extends Factory<Content>
 */
class ContentFactory extends Factory
{
    protected $model = Content::class;

    public function definition(): array
    {
        $title = $this->faker->sentence(6);
        $body  = implode("\n\n", $this->faker->paragraphs(4));

        return [
            'ulid'         => strtolower((string) new Ulid()),
            'workspace_id' => Workspace::factory(),
            'created_by'   => User::factory(),
            'status_id'    => 1,
            'source_id'    => null,
            'type'         => $this->faker->randomElement(['note', 'bookmark', 'article', 'journal']),
            'visibility'   => 'private',
            'title'        => $title,
            'slug'         => Str::slug($title) . '-' . $this->faker->unique()->numberBetween(1000, 9999),
            'excerpt'      => $this->faker->paragraph(),
            'body'         => $body,
            'cover_url'    => null,
            'original_url' => null,
            'language'     => 'it',
            'meta'         => null,
            'published_at' => null,
            'archived_at'  => null,
        ];
    }

    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'visibility'   => 'public',
            'published_at' => now(),
        ]);
    }

    public function archived(): static
    {
        return $this->state(fn (array $attributes) => [
            'archived_at' => now(),
        ]);
    }

    public function note(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'note',
        ]);
    }

    public function article(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'article',
        ]);
    }

    public function bookmark(): static
    {
        return $this->state(fn (array $attributes) => [
            'type'         => 'bookmark',
            'original_url' => $this->faker->url(),
        ]);
    }
}
