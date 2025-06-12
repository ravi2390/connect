<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsToDuesMappingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('dues_mapping', function (Blueprint $table): void {
            $table->string('billing_type_name', 100)->nullable();
            $table->string('amount', 10)->nullable();
            $table->string('frequency', 100)->nullable();
            $table->dateTime('effective_date')->nullable();
            $table->boolean('deleted')->nullable()->default(false);
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('dues_mapping', function (Blueprint $table): void {
            $table->dropColumn('billing_type_name');
            $table->dropColumn('amount');
            $table->dropColumn('frequency');
            $table->dropColumn('effective_date');
            $table->dropColumn('deleted');
            $table->dropColumn('created_by');
            $table->dropColumn('updated_by');
        });
    }
}
