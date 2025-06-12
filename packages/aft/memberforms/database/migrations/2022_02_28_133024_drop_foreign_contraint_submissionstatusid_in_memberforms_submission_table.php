<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropForeignContraintSubmissionstatusidInMemberformsSubmissionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('memberforms_submission', function (Blueprint $table): void {
            $table->dropForeign('laravel_memberforms_submission_submission_status_id_foreign');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('memberforms_submission', function (Blueprint $table): void {
            //
        });
    }
}
