<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('content_reading_states', function (Blueprint $t) {
            $t->id();
            $t->foreignId('content_id')->constrained('contents')->cascadeOnDelete();
            $t->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $t->foreignId('reading_status_id')->constrained('reading_statuses')->restrictOnDelete();
            $t->unsignedTinyInteger('progress_percent')->default(0)->comment('0-100');
            $t->unsignedSmallInteger('scroll_position')->nullable()->comment('Posizione scroll in pixel');
            $t->timestamp('started_at')->nullable();
            $t->timestamp('finished_at')->nullable();
            $t->timestamps();

            $t->unique(['content_id', 'user_id']);
            $t->index(['user_id', 'reading_status_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('content_reading_states');
    }
};
