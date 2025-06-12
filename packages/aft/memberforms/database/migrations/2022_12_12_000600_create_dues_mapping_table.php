<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDuesMappingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('dues_mapping', function (Blueprint $table): void {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('dues_category_id');
            $table->unsignedBigInteger('bill_highway_type_id')->comment('1 is for NA');
            $table->unsignedBigInteger('affiliate_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('dues_mapping');
    }
}
