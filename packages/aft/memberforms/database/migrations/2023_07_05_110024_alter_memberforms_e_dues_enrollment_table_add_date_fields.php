<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterMemberformsEDuesEnrollmentTableAddDateFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('memberforms_eDues_enrollment', function (Blueprint $table): void {
            $table->dateTime('SubmissionDate')->nullable();
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
        Schema::table('memberforms_eDues_enrollment', function (Blueprint $table): void {
            $table->dropColumn('SubmissionDate');
            $table->dropColumn('DeletedAt');
        });
    }
}
