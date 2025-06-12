<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['profile_id']);
        });
        Schema::table('user_profiles', function (Blueprint $table) {
            $table->dropPrimary(['user_id']);
        });
        Schema::table('component_states', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });

        Schema::dropIfExists('user_profiles');
        Schema::dropIfExists('users');

        Schema::create('user_profiles', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->unique();
            $table->string('avatar')->nullable();
            $table->string('language')->default('en')->nullable();
            $table->string('theme')->default('default')->nullable();
            $table->text('metadata')->default('{}')->nullable();
            $table->string('selected_entity_type')->nullable();
            $table->unsignedBigInteger('selected_entity_id')->nullable();
            $table->index(['selected_entity_type', 'selected_entity_id']);
        });

        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->timestamp('password_expires_at')->nullable();
            $table->string('type');
            $table->unsignedBigInteger('profile_id')->nullable();
            $table->unsignedBigInteger('individual_id')->default(null)->nullable();
            $table->dateTime('last_login_at')->nullable();
            $table->string('last_login_ip')->nullable();
            $table->text('last_login_agent')->nullable();
            $table->string('password_previous')->nullable();
            $table->rememberToken();
            $table->unsignedBigInteger('CreatedBy');
            $table->timestamp('CreatedAt', 0)->nullable();
            $table->unsignedBigInteger('UpdatedBy');
            $table->timestamp('UpdatedAt', 0)->nullable();
            $table->softDeletes('DeletedAt');

            $table->foreign('profile_id')
                ->references('id')
                ->on('user_profiles');
            $table->index('individual_id');
        });

        Schema::table('component_states', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No going back!
    }
};
