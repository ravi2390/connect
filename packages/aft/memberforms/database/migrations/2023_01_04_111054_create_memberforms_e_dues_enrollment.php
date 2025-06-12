<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMemberformsEDuesEnrollment extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('memberforms_eDues_enrollment', function (Blueprint $table): void {
            $table->bigInteger('IndividualId');
            $table->bigInteger('AffiliateId');
            $table->primary(['IndividualId', 'AffiliateId']);
            $table->string('PaymentMethod');
            $table->string('AccountType');
            $table->string('AccountNumberLastFour');
            $table->string('PaymentToken');
            $table->bigInteger('BHIndividualId');
            $table->bigInteger('SubmissionId')->nullable();
            $table->string('Source')->nullable();
            $table->unsignedBigInteger('CreatedBy');
            $table->timestamp('CreatedAt');
            $table->unsignedBigInteger('UpdatedBy')->nullable();
            $table->timestamp('UpdatedAt')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('memberforms_eDues_enrollment');
    }
}
