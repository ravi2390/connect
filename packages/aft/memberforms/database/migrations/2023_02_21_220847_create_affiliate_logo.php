<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAffiliateLogo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('affiliate_logo', function (Blueprint $table): void {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('affiliate_id');
            $table->string('local_logo')->nullable();
            $table->string('fed_logo')->nullable();
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
        Schema::dropIfExists('affiliate_logo');
    }
}
