<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('workspaces', function (Blueprint $t) {
            $t->id();
            $t->char('ulid', 26)->unique();
            $t->foreignId('owner_user_id')->constrained('users')->cascadeOnDelete();
            $t->string('name', 120);
            $t->string('slug', 80)->unique();
            $t->string('plan', 20)->default('free')->comment('free, pro, team');
            $t->string('logo_url', 500)->nullable();
            $t->json('settings')->nullable()->comment('JSON opzioni workspace');
            $t->timestamp('suspended_at')->nullable();
            $t->timestamps();

            $t->index('owner_user_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('workspaces');
    }
};
