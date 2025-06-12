<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMemberformsSubmissionDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('memberforms_submission_data', function (Blueprint $table): void {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('form_id');
            $table->unsignedBigInteger('submission_id');
            $table->string('data_type');
            $table->string('data_name');
            $table->string('data_label');
            $table->text('data_value');
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
        Schema::dropIfExists('memberforms_submission_data');
    }
}
