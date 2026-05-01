<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $t) {
            $t->id();
            $t->char('ulid', 26)->unique();
            $t->string('name', 120);
            $t->string('email')->unique();
            $t->timestamp('email_verified_at')->nullable();
            $t->string('password_hash', 255)->nullable()->comment('NULL se solo OAuth');
            $t->string('avatar_url', 500)->nullable();
            $t->string('locale', 10)->default('it');
            $t->string('timezone', 50)->default('Europe/Rome');
            $t->timestamp('deactivated_at')->nullable();
            $t->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
