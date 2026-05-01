<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TopicsSeeder extends Seeder
{
    public function run(): void
    {
        $topics = [
            ['slug' => 'tech',         'name' => 'Tech',         'sort_order' => 0],
            ['slug' => 'ai',           'name' => 'AI',           'sort_order' => 1],
            ['slug' => 'philosophy',   'name' => 'Philosophy',   'sort_order' => 2],
            ['slug' => 'finance',      'name' => 'Finance',      'sort_order' => 3],
            ['slug' => 'design',       'name' => 'Design',       'sort_order' => 4],
            ['slug' => 'science',      'name' => 'Science',      'sort_order' => 5],
            ['slug' => 'history',      'name' => 'History',      'sort_order' => 6],
            ['slug' => 'productivity', 'name' => 'Productivity', 'sort_order' => 7],
            ['slug' => 'security',     'name' => 'Security',     'sort_order' => 8],
            ['slug' => 'language',     'name' => 'Language',     'sort_order' => 9],
            ['slug' => 'culture',      'name' => 'Culture',      'sort_order' => 10],
            ['slug' => 'business',     'name' => 'Business',     'sort_order' => 11],
            ['slug' => 'health',       'name' => 'Health',       'sort_order' => 12],
            ['slug' => 'writing',      'name' => 'Writing',      'sort_order' => 13],
        ];

        foreach ($topics as $topic) {
            DB::table('topics')->insertOrIgnore([
                'workspace_id' => 1,
                'parent_id'    => null,
                'name'         => $topic['name'],
                'slug'         => $topic['slug'],
                'path'         => '/' . $topic['slug'],
                'color_hex'    => null,
                'icon'         => null,
                'sort_order'   => $topic['sort_order'],
                'created_at'   => now(),
                'updated_at'   => now(),
            ]);
        }
    }
}
