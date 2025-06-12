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
        Schema::dropIfExists('auth_roles');
        Schema::create('auth_roles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->text('ability_base');
            $table->unsignedBigInteger('CreatedBy');
            $table->timestamp('CreatedAt', 0)->nullable();
            $table->unsignedBigInteger('UpdatedBy');
            $table->timestamp('UpdatedAt', 0)->nullable();
            $table->softDeletes('DeletedAt');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
