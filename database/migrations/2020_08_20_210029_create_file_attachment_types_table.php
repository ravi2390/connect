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
        Schema::create('file_attachment_types', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('FileAttachmentType');
            $table->bigInteger('CreatedBy');
            $table->timestamp('CreatedAt', 0)->useCurrent()->nullable();
            $table->bigInteger('UpdatedBy');
            $table->timestamp('UpdatedAt', 0)->useCurrent()->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('file_attachment_types');
    }
};
