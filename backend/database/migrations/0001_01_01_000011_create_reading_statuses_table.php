<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reading_statuses', function (Blueprint $t) {
            $t->id();
            $t->string('slug', 40)->unique();
            $t->string('label', 80);
            $t->unsignedTinyInteger('sort_order')->default(0);
            $t->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reading_statuses');
    }
};
