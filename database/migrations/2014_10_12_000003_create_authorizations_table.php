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
        Schema::create('authorizations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_id');
            $table->bigInteger('role_id')->nullable(); // TODO: nullable for now
            $table->string('entity_type');
            $table->bigInteger('entity_id');
            $table->boolean('entity_inherit');
            $table->bigInteger('CreatedBy');
            $table->timestamp('CreatedAt', 0)->nullable();
            $table->bigInteger('UpdatedBy');
            $table->timestamp('UpdatedAt', 0)->nullable();
            $table->softDeletes('DeletedAt');

            $table->unique(['user_id', 'role_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('authorizations');
    }
};
