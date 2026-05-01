<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('read_later_queue', function (Blueprint $t) {
            $t->id();
            $t->foreignId('workspace_id')->constrained('workspaces')->cascadeOnDelete();
            $t->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $t->foreignId('content_id')->constrained('contents')->cascadeOnDelete();
            $t->unsignedSmallInteger('sort_order')->default(0);
            $t->timestamp('snoozed_until')->nullable();
            $t->timestamp('added_at')->useCurrent();

            $t->unique(['user_id', 'content_id']);
            $t->index(['user_id', 'sort_order']);
            $t->index(['user_id', 'snoozed_until']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('read_later_queue');
    }
};
