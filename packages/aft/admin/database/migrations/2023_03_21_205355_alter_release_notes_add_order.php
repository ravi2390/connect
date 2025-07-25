<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterReleaseNotesAddOrder extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('release_notes', function (Blueprint $table): void {
            $table->integer('order')->default(0)->after('is_active');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('release_notes', function (Blueprint $table): void {
            $table->dropColumn('order');
        });
    }
}
