<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUrlRedirects extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('form_url_redirects', function (Blueprint $table): void {
            $table->bigIncrements('id');
            $table->string('custom_url');
            $table->string('affiliate_name')->nullable();
            $table->unsignedBigInteger('form_id');
            $table->timestamp('CreatedAt')->nullable();
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
        Schema::dropIfExists('url_redirects');
    }
}
