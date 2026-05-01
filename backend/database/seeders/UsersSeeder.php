<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\Uid\Ulid;

class UsersSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insertOrIgnore([
            'ulid'              => strtolower((string) new Ulid()),
            'name'              => 'Vincenzo Pirozzi',
            'email'             => 'dev@sagresgestioni.it',
            'email_verified_at' => now(),
            'password_hash'     => Hash::make('Pinakes2026!'),
            'avatar_url'        => null,
            'locale'            => 'it',
            'timezone'          => 'Europe/Rome',
            'deactivated_at'    => null,
            'created_at'        => now(),
            'updated_at'        => now(),
        ]);
    }
}
