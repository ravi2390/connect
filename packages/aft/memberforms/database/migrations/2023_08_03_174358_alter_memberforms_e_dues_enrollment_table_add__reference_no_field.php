<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterMemberformsEDuesEnrollmentTableAddReferenceNoField extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('memberforms_eDues_enrollment', function (Blueprint $table): void {
            $table->string('ReferenceNo')->nullable();
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
            $table->dropColumn('ReferenceNo');
        });
    }
}
