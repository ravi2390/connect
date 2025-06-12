<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterUrlRedirectsAddAffiliateNumber extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('form_url_redirects', function (Blueprint $table): void {
            $table->string('affiliate_number')->nullable()->after('affiliate_name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('form_url_redirects', function (Blueprint $table): void {
            $table->dropColumn('affiliate_number');
        });
    }
}
