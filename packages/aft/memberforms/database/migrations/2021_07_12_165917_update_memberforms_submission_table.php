<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class UpdateMemberformsSubmissionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('memberforms_submission', function ($table): void {
            $table->unsignedSmallInteger('submission_status_id')->default(1)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('memberforms_submission', function ($table): void {
            $table->unsignedSmallInteger('submission_status_id')->default(null)->change();
        });
    }
}
