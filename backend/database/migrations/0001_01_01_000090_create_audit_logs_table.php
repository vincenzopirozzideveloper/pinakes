<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('audit_logs', function (Blueprint $t) {
            $t->id();
            $t->foreignId('workspace_id')->constrained('workspaces')->cascadeOnDelete();
            $t->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $t->string('event', 80)->comment('content.created, content.deleted, workspace.settings_changed, ecc.');
            $t->unsignedBigInteger('auditable_id')->nullable();
            $t->string('auditable_type', 100)->nullable();
            $t->json('old_values')->nullable();
            $t->json('new_values')->nullable();
            $t->string('ip_address', 45)->nullable();
            $t->string('user_agent', 300)->nullable();
            $t->timestamp('created_at')->useCurrent();

            $t->index(['workspace_id', 'event', 'created_at'], 'idx_audit_workspace_event');
            $t->index(['auditable_id', 'auditable_type'], 'idx_audit_auditable');
            $t->index(['user_id', 'created_at'], 'idx_audit_user');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
    }
};
