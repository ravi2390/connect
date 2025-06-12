<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMemberformsEDuesErrorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('memberforms_eDues_error', function (Blueprint $table): void {
            $table->bigIncrements('ErrorId');
            $table->bigInteger('EDuesEnrollmentId')->nullable();
            $table->string('RequestEndpoint', 250)->nullable();
            $table->string('RequestPayload', 1000)->nullable();
            $table->bigInteger('ErrorCode')->nullable();
            $table->string('ErrorDescription',1000)->nullable();
            $table->string('ErrorTriggeredFrom')->nullable();
            $table->boolean('ErrorResolved')->default(0)->nullable();
            $table->unsignedBigInteger('CreatedBy')->nullable();
            $table->timestamp('CreatedAt')->useCurrent()->nullable();
            $table->unsignedBigInteger('UpdatedBy')->nullable();
            $table->timestamp('UpdatedAt')->useCurrent()->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('memberforms_eDues_error');
    }
}
