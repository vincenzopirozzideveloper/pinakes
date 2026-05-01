<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('collection_items', function (Blueprint $t) {
            $t->id();
            $t->foreignId('collection_id')->constrained('collections')->cascadeOnDelete();
            $t->foreignId('content_id')->constrained('contents')->cascadeOnDelete();
            $t->unsignedSmallInteger('sort_order')->default(0);
            $t->text('note')->nullable();
            $t->timestamp('added_at')->useCurrent();

            $t->unique(['collection_id', 'content_id']);
            $t->index(['collection_id', 'sort_order']);
            $t->index('content_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('collection_items');
    }
};
