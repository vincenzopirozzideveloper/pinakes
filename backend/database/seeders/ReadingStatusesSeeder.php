<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReadingStatusesSeeder extends Seeder
{
    public function run(): void
    {
        $readingStatuses = [
            ['slug' => 'inbox',     'label' => 'In arrivo',  'sort_order' => 0],
            ['slug' => 'reading',   'label' => 'In lettura', 'sort_order' => 1],
            ['slug' => 'read',      'label' => 'Letto',      'sort_order' => 2],
            ['slug' => 'abandoned', 'label' => 'Abbandonato','sort_order' => 3],
        ];

        foreach ($readingStatuses as $status) {
            DB::table('reading_statuses')->insertOrIgnore(array_merge($status, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
