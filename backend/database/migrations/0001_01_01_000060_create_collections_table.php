<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('collections', function (Blueprint $t) {
            $t->id();
            $t->char('ulid', 26)->unique();
            $t->foreignId('workspace_id')->constrained('workspaces')->cascadeOnDelete();
            $t->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $t->string('name', 200);
            $t->string('slug', 200);
            $t->text('description')->nullable();
            $t->string('cover_url', 500)->nullable();
            $t->string('visibility', 20)->default('private')->comment('public, unlisted, private');
            $t->boolean('is_pinned')->default(false);
            $t->timestamps();

            $t->unique(['workspace_id', 'slug']);
            $t->index(['workspace_id', 'visibility', 'is_pinned']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('collections');
    }
};
