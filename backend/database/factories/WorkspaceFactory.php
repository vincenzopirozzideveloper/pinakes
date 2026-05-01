<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\User;
use App\Models\Workspace;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Symfony\Component\Uid\Ulid;

/**
 * @extends Factory<Workspace>
 */
class WorkspaceFactory extends Factory
{
    protected $model = Workspace::class;

    public function definition(): array
    {
        $name = $this->faker->company();

        return [
            'ulid'          => strtolower((string) new Ulid()),
            'owner_user_id' => User::factory(),
            'name'          => $name,
            'slug'          => Str::slug($name) . '-' . $this->faker->unique()->numberBetween(1000, 9999),
            'plan'          => 'free',
            'logo_url'      => null,
            'settings'      => null,
            'suspended_at'  => null,
        ];
    }

    public function pro(): static
    {
        return $this->state(fn (array $attributes) => [
            'plan' => 'pro',
        ]);
    }

    public function team(): static
    {
        return $this->state(fn (array $attributes) => [
            'plan' => 'team',
        ]);
    }

    public function suspended(): static
    {
        return $this->state(fn (array $attributes) => [
            'suspended_at' => now(),
        ]);
    }
}
