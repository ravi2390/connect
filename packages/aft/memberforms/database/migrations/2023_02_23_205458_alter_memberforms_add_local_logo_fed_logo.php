<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterMemberformsAddLocalLogoFedLogo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('memberforms_forms', function (Blueprint $table): void {
            $table->boolean('show_local_logo')->default(false);
            $table->boolean('show_fed_logo')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('memberforms_forms', function (Blueprint $table): void {
            $table->dropColumn('show_local_logo');
            $table->dropColumn('show_fed_logo');
        });
    }
}
