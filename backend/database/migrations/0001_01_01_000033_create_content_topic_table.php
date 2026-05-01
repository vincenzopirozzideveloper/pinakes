<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('content_topic', function (Blueprint $t) {
            $t->foreignId('content_id')->constrained('contents')->cascadeOnDelete();
            $t->foreignId('topic_id')->constrained('topics')->cascadeOnDelete();
            $t->unsignedTinyInteger('sort_order')->default(0);

            $t->primary(['content_id', 'topic_id']);
            $t->index('topic_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('content_topic');
    }
};
