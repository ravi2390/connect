<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsToMemberformsReponses extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('memberforms_responses', function (Blueprint $table): void {
            $table->unsignedBigInteger('form_id');
            $table->text('parameter_name');
            $table->text('parameter_value');
            $table->text('guid');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('memberforms_responses', function (Blueprint $table): void {
            //
        });
    }
}
