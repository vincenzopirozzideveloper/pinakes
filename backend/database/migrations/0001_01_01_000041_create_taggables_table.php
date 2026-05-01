<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('taggables', function (Blueprint $t) {
            $t->foreignId('tag_id')->constrained('tags')->cascadeOnDelete();
            $t->unsignedBigInteger('taggable_id');
            $t->string('taggable_type', 100);

            $t->primary(['tag_id', 'taggable_id', 'taggable_type']);
            $t->index(['taggable_id', 'taggable_type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('taggables');
    }
};
