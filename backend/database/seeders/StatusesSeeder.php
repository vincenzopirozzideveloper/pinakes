<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusesSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = [
            ['slug' => 'draft',     'label' => 'Bozza',      'color_hex' => '#6B7280', 'sort_order' => 0],
            ['slug' => 'seedling',  'label' => 'Germoglio',  'color_hex' => '#84CC16', 'sort_order' => 1],
            ['slug' => 'budding',   'label' => 'In crescita','color_hex' => '#EAB308', 'sort_order' => 2],
            ['slug' => 'evergreen', 'label' => 'Evergreen',  'color_hex' => '#22C55E', 'sort_order' => 3],
            ['slug' => 'archived',  'label' => 'Archiviato', 'color_hex' => '#9CA3AF', 'sort_order' => 4],
        ];

        foreach ($statuses as $status) {
            DB::table('statuses')->insertOrIgnore(array_merge($status, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
