<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Symfony\Component\Uid\Ulid;

class WorkspacesSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('workspaces')->insertOrIgnore([
            'ulid'          => strtolower((string) new Ulid()),
            'owner_user_id' => 1,
            'name'          => 'Pinakes di Vincenzo',
            'slug'          => 'vincenzo',
            'plan'          => 'pro',
            'logo_url'      => null,
            'settings'      => null,
            'suspended_at'  => null,
            'created_at'    => now(),
            'updated_at'    => now(),
        ]);

        DB::table('workspace_members')->insertOrIgnore([
            'workspace_id' => 1,
            'user_id'      => 1,
            'role'         => 'owner',
            'invited_at'   => now(),
            'accepted_at'  => now(),
            'created_at'   => now(),
            'updated_at'   => now(),
        ]);
    }
}
