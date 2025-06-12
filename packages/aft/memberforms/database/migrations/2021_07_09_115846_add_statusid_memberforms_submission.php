<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddStatusidMemberformsSubmission extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('memberforms_submission', function (Blueprint $table): void {
            $table->unsignedSmallInteger('submission_status_id')->nullable();
            $table->foreign('submission_status_id')->references('id')->on('memberforms_submission_status');
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
            $table->dropColumn('submission_status_id');
        });
    }
}
