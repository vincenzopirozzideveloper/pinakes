<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('content_links', function (Blueprint $t) {
            $t->id();
            $t->foreignId('workspace_id')->constrained('workspaces')->cascadeOnDelete();
            $t->foreignId('source_id')->constrained('contents')->cascadeOnDelete();
            $t->foreignId('target_id')->constrained('contents')->cascadeOnDelete();
            $t->string('link_type', 40)->default('related')->comment('related, references, contradicts, supports');
            $t->text('note')->nullable();
            $t->timestamps();

            $t->unique(['workspace_id', 'source_id', 'target_id', 'link_type'], 'uq_content_links');
            $t->index(['workspace_id', 'source_id', 'target_id', 'link_type'], 'idx_content_links_lookup');
            $t->index('target_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('content_links');
    }
};
