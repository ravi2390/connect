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
        Schema::create('file_attachments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('AffiliateId');
            $table->bigInteger('FileAttachmentTypeId');
            $table->bigInteger('EntityId');
            $table->string('OriginalFileName');
            $table->string('UniqueFileName');
            $table->string('Description')->nullable();
            $table->bigInteger('FileSize');
            $table->bigInteger('CreatedBy');
            $table->timestamp('CreatedAt', 0)->nullable();
            $table->bigInteger('UpdatedBy');
            $table->timestamp('UpdatedAt', 0)->nullable();

            $table->foreign('FileAttachmentTypeId')
                ->references('id')
                ->on('file_attachment_types');

            $table->index(['AffiliateId', 'EntityId']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('file_attachments');
    }
};
