<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMemberformsResponsesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('memberforms_responses', function (Blueprint $table): void {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('CreatedBy');
            $table->timestamp('CreatedAt')->nullable();
            $table->unsignedBigInteger('UpdatedBy');
            $table->timestamp('UpdatedAt')->nullable();
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
        Schema::dropIfExists('memberforms_responses');
    }
}
