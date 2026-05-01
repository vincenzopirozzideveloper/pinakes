<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('topics', function (Blueprint $t) {
            $t->id();
            $t->foreignId('workspace_id')->constrained('workspaces')->cascadeOnDelete();
            $t->foreignId('parent_id')->nullable()->constrained('topics')->nullOnDelete();
            $t->string('name', 100);
            $t->string('slug', 100);
            $t->string('path', 500)->comment('Materialized path: /parent-slug/child-slug');
            $t->string('color_hex', 7)->nullable();
            $t->string('icon', 40)->nullable();
            $t->unsignedSmallInteger('sort_order')->default(0);
            $t->timestamps();

            $t->unique(['workspace_id', 'slug']);
        });

        DB::statement('ALTER TABLE topics ADD INDEX idx_topics_path (workspace_id, path(200))');
    }

    public function down(): void
    {
        Schema::dropIfExists('topics');
    }
};
