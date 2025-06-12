<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class UpdateMemberformsFormsDatatype extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        DB::statement('ALTER TABLE laravel_memberforms_forms ALTER COLUMN employment_information_fields VARCHAR(MAX)');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        DB::statement('ALTER TABLE laravel_memberforms_forms ALTER COLUMN employment_information_fields STRING');
    }
}
