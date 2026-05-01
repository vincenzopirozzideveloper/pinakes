<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('highlights', function (Blueprint $t) {
            $t->id();
            $t->char('ulid', 26)->unique();
            $t->foreignId('content_id')->constrained('contents')->cascadeOnDelete();
            $t->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $t->text('selected_text');
            $t->text('note')->nullable();
            $t->string('color', 20)->default('yellow')->comment('yellow, green, blue, pink, purple');
            $t->unsignedSmallInteger('position_start')->nullable()->comment('Posizione carattere nel body');
            $t->unsignedSmallInteger('position_end')->nullable();
            $t->timestamps();

            $t->index(['content_id', 'user_id']);
            $t->index(['user_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('highlights');
    }
};
