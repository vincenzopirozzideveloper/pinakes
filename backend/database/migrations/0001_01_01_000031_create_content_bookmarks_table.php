<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('content_bookmarks', function (Blueprint $t) {
            $t->id();
            $t->foreignId('content_id')->constrained('contents')->cascadeOnDelete();
            $t->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $t->timestamp('bookmarked_at')->useCurrent();

            $t->unique(['content_id', 'user_id']);
            $t->index('user_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('content_bookmarks');
    }
};
