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
        Schema::create('contents', function (Blueprint $t) {
            $t->id();
            $t->char('ulid', 26)->unique();
            $t->foreignId('workspace_id')->constrained('workspaces')->cascadeOnDelete();
            $t->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $t->foreignId('status_id')->constrained('statuses')->restrictOnDelete();
            $t->foreignId('source_id')->nullable()->constrained('sources')->nullOnDelete();
            $t->string('type', 20)->default('note')->comment('note, bookmark, article, journal');
            $t->string('visibility', 20)->default('private')->comment('public, unlisted, private');
            $t->string('title', 500);
            $t->string('slug', 500)->nullable();
            $t->text('excerpt')->nullable();
            $t->longText('body')->nullable();
            $t->string('cover_url', 500)->nullable();
            $t->string('original_url', 2000)->nullable();
            $t->string('language', 10)->nullable();
            $t->json('meta')->nullable()->comment('JSON metadati extra (autore, isbn, ecc.)');
            $t->unsignedSmallInteger('read_time_minutes')->nullable();
            $t->timestamp('published_at')->nullable();
            $t->timestamp('archived_at')->nullable();
            $t->timestamps();

            $t->index(['workspace_id', 'visibility', 'type', 'status_id', 'published_at'], 'idx_contents_browse');
            $t->index(['workspace_id', 'created_by', 'created_at'], 'idx_contents_by_user');
            $t->index(['workspace_id', 'type', 'archived_at'], 'idx_contents_type_archive');
        });

        DB::statement(
            "ALTER TABLE contents ADD word_count SMALLINT UNSIGNED GENERATED ALWAYS AS " .
            "(CHAR_LENGTH(body) - CHAR_LENGTH(REPLACE(body, ' ', ''))) STORED"
        );

        DB::statement(
            'ALTER TABLE contents ADD FULLTEXT INDEX ft_contents (title, excerpt, body)'
        );
    }

    public function down(): void
    {
        Schema::dropIfExists('contents');
    }
};
