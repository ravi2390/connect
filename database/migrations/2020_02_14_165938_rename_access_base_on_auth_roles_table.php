<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('auth_roles', function (Blueprint $table) {
            $table->renameColumn('access_base', 'ability_base');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('auth_roles', function (Blueprint $table) {
            $table->renameColumn('ability_base', 'access_base');
        });
    }
};
