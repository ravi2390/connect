<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMemberformsTemplatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('memberforms_templates', function (Blueprint $table): void {
            $table->bigIncrements('id');
            $table->string('system_name');
            $table->string('display_name');
            $table->text('parameters');
            $table->text('sources');
            $table->text('destinations');
            $table->text('fields');
            $table->text('optional_fields');
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
        Schema::dropIfExists('memberforms_templates');
    }
}
