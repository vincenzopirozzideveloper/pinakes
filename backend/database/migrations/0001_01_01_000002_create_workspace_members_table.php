<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('workspace_members', function (Blueprint $t) {
            $t->id();
            $t->foreignId('workspace_id')->constrained('workspaces')->cascadeOnDelete();
            $t->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $t->string('role', 20)->default('viewer')->comment('owner, editor, viewer');
            $t->timestamp('invited_at')->nullable();
            $t->timestamp('accepted_at')->nullable();
            $t->timestamps();

            $t->unique(['workspace_id', 'user_id']);
            $t->index('user_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('workspace_members');
    }
};
