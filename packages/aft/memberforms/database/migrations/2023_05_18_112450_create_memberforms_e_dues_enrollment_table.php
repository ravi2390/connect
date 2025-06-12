<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMemberformsEDuesEnrollmentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        if (Schema::hasTable('memberforms_eDues_enrollment') && ! Schema::hasColumn('memberforms_eDues_enrollment', 'EDuesEnrollmentId')) {
            Schema::drop('memberforms_eDues_enrollment');
            Schema::create('memberforms_eDues_enrollment', function (Blueprint $table): void {
                $table->bigIncrements('EDuesEnrollmentId');
                $table->bigInteger('IndividualId');
                $table->bigInteger('AffiliateId');
                $table->unique(['IndividualId', 'AffiliateId']);
                $table->string('PaymentMethod', 200)->nullable();
                $table->string('AccountType', 50)->nullable();
                $table->string('AccountNumberLastFour', 50)->nullable();
                $table->string('PaymentToken', 200)->nullable();
                $table->bigInteger('BHIndividualId')->nullable();
                $table->bigInteger('SubmissionId')->nullable();
                $table->string('Source', 50)->nullable();
                $table->unsignedBigInteger('CreatedBy');
                $table->timestamp('CreatedAt');
                $table->unsignedBigInteger('UpdatedBy')->nullable();
                $table->timestamp('UpdatedAt')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        if (Schema::hasTable('memberforms_eDues_enrollment') && Schema::hasColumn('memberforms_eDues_enrollment', 'EDuesEnrollmentId')) {
            Schema::dropIfExists('memberforms_eDues_enrollment');
        }
    }
}
