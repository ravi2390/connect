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
        Schema::connection('aftdb')->table('employeraddress', function (Blueprint $table) {
            if (!Schema::connection('aftdb')->hasColumn('employeraddress', 'canvisitrestrictionid')) {
                $table->integer('canvisitrestrictionid')->nullable();
            } else {
                $table->integer('canvisitrestrictionid')->nullable()->change();
            }

            if (!Schema::connection('aftdb')->hasColumn('employeraddress', 'cansendmailrestrictionid')) {
                $table->integer('cansendmailrestrictionid')->nullable();
            } else {
                $table->integer('cansendmailrestrictionid')->nullable()->change();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
