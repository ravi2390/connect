<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStaffbetaDownloadsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('staffbeta_downloads', function (Blueprint $table): void {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('label');
            $table->text('description')->nullable();
            $table->bigInteger('order')->nullable();
            $table->string('ability')->nullable();
            $table->text('action')->nullable();
            $table->text('options')->nullable();
            $table->text('source')->nullable();
            $table->unsignedBigInteger('CreatedBy');
            $table->timestamp('CreatedAt')->useCurrent();
            $table->unsignedBigInteger('UpdatedBy');
            $table->timestamp('UpdatedAt')->useCurrent();
            $table->timestamp('DeletedAt')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('staffbeta_downloads');
    }
}
