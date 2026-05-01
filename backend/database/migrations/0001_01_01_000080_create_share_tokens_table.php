<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('share_tokens', function (Blueprint $t) {
            $t->id();
            $t->string('token', 64)->unique();
            $t->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $t->unsignedBigInteger('shareable_id');
            $t->string('shareable_type', 100);
            $t->string('permission', 20)->default('read')->comment('read, comment');
            $t->timestamp('expires_at')->nullable();
            $t->unsignedInteger('access_count')->default(0);
            $t->timestamps();

            $t->index(['shareable_id', 'shareable_type']);
            $t->index('created_by');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('share_tokens');
    }
};
