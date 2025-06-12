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
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('selected_entity');
            $table->bigInteger('CreatedBy');
            $table->timestamp('CreatedAt', 0)->nullable();
            $table->bigInteger('UpdatedBy');
            $table->timestamp('UpdatedAt', 0)->nullable();
            $table->softDeletes('DeletedAt');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};
