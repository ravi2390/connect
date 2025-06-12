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
            /** @var \Doctrine\DBAL\Schema\SQLServerSchemaManager $sm */
            $sm = Schema::getConnection()->getDoctrineSchemaManager();
            $fk = array_filter($sm->listTableForeignKeys('laravel_users'), function (\Doctrine\DBAL\Schema\ForeignKeyConstraint $constraint) {
                return $constraint->getName() === 'laravel_users_profile_id_foreign';
            });

            if (count($fk) > 0) {
                $sm->dropForeignKey('laravel_users_profile_id_foreign', 'laravel_users');
            }
        });

        Schema::dropIfExists('user_profiles');

        Schema::create('user_profiles', function (Blueprint $table) {
            $table->bigInteger('user_id');
            $table->string('selected_entity');
            $table->bigInteger('CreatedBy');
            $table->timestamp('CreatedAt', 0)->nullable();
            $table->bigInteger('UpdatedBy');
            $table->timestamp('UpdatedAt', 0)->nullable();
            $table->softDeletes('DeletedAt');
            $table->primary('user_id');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->foreign('profile_id')
                ->references('user_id')
                ->on('user_profiles')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['profile_id']);
        });

        Schema::dropIfExists('user_profiles');

        Schema::create('user_profiles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('selected_entity');
            $table->bigInteger('CreatedBy');
            $table->timestamp('CreatedAt', 0)->nullable();
            $table->bigInteger('UpdatedBy');
            $table->timestamp('UpdatedAt', 0)->nullable();
            $table->softDeletes('DeletedAt');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->foreign('profile_id')
                ->references('id')
                ->on('user_profiles')
                ->onDelete('cascade');
        });
    }
};
