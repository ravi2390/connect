<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMemberFormsFormsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::dropIfExists('memberforms');
        Schema::create('memberforms_forms', function (Blueprint $table): void {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('affiliate_id');
            $table->unsignedBigInteger('form_template_id');
            $table->string('system_name');
            $table->string('display_name');
            $table->boolean('show_in_directory')->default(true);
            $table->text('sources');
            $table->text('destinations');
            $table->text('fields');
            $table->integer('order');
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
        Schema::dropIfExists('memberforms_forms');
    }
}
