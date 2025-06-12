<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAuthAbilitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('auth_abilities', function (Blueprint $table): void {
            $table->bigIncrements('id');
            $table->string('type');
            $table->string('name');
            $table->bigInteger('order');
            $table->bigInteger('CreatedBy');
            $table->timestamp('CreatedAt', 0)->nullable();
            $table->bigInteger('UpdatedBy');
            $table->timestamp('UpdatedAt', 0)->nullable();
            $table->softDeletes('DeletedAt');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('auth_abilities');
    }
}
