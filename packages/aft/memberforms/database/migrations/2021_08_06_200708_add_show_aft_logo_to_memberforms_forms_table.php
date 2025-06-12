<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddShowAftLogoToMemberformsFormsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('memberforms_forms', function (Blueprint $table): void {
            $table->boolean('show_aft_logo')->default(true);
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
            $table->dropColumn('show_aft_logo');
        });
    }
}
