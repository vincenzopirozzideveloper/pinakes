<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('content_versions', function (Blueprint $t) {
            $t->id();
            $t->foreignId('content_id')->constrained('contents')->cascadeOnDelete();
            $t->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $t->unsignedSmallInteger('version_number');
            $t->string('title', 500);
            $t->longText('body')->nullable();
            $t->text('change_summary')->nullable();
            $t->timestamp('created_at')->useCurrent();

            $t->unique(['content_id', 'version_number']);
            $t->index(['content_id', 'version_number']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('content_versions');
    }
};
