<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMemberformsResponseDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('memberforms_response_data', function (Blueprint $table): void {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('response_id');
            $table->text('parameter_name');
            $table->text('parameter_value')->nullable();
            $table->unsignedBigInteger('CreatedBy');
            $table->timestamp('CreatedAt')->nullable();
            $table->unsignedBigInteger('UpdatedBy');
            $table->timestamp('UpdatedAt')->nullable();
            $table->timestamp('DeletedAt')->nullable();
            $table->foreign('response_id')
                ->references('id')
                ->on('memberforms_responses')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('memberforms_response_data');
    }
}
