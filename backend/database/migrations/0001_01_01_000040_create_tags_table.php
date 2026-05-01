<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tags', function (Blueprint $t) {
            $t->id();
            $t->foreignId('workspace_id')->constrained('workspaces')->cascadeOnDelete();
            $t->string('name', 80);
            $t->string('slug', 80);
            $t->string('color_hex', 7)->nullable();
            $t->timestamps();

            $t->unique(['workspace_id', 'slug']);
            $t->index('workspace_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tags');
    }
};
