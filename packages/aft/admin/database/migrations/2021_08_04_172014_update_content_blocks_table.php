<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateContentBlocksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('content_blocks', function (Blueprint $table): void {
            $table->string('application')->default('connect');
            $table->string('priority')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('content_blocks', function (Blueprint $table): void {
            $table->dropColumn('application');
            $table->dropColumn('priority');
        });
    }
}
