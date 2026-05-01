<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sources', function (Blueprint $t) {
            $t->id();
            $t->foreignId('workspace_id')->constrained('workspaces')->cascadeOnDelete();
            $t->string('name', 150);
            $t->string('url', 500)->nullable();
            $t->string('favicon_url', 500)->nullable();
            $t->string('feed_url', 500)->nullable();
            $t->string('type', 30)->default('website')->comment('website, rss, podcast, newsletter, book');
            $t->timestamp('last_fetched_at')->nullable();
            $t->timestamps();

            $t->index('workspace_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sources');
    }
};
