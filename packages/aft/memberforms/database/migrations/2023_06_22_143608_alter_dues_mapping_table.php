<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterDuesMappingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('dues_mapping', function (Blueprint $table): void {
            $table->dropColumn('deleted');
            $table->dateTime('DeletedAt')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('dues_mapping', function (Blueprint $table): void {
            $table->dropColumn('DeletedAt');
            $table->boolean('deleted')->nullable()->default(false);
        });
    }
}
