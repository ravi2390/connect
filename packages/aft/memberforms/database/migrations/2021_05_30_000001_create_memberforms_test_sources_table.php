<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMemberformsTestSourcesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('memberforms_test_sources', function (Blueprint $table): void {
            $table->bigIncrements('id');

            /*
             * system unique identifier, format camelCase
             */
            $table->string('name', 32)->unique();

            /*
             * null
             * binary
             * number
             * text
             * list
             * query
             * function
             * reference
             * <...future definitions>
             */
            $table->string('type', 32);

            /*
             * human readable
             */
            $table->string('label', 32);

            /*
             * All values in JSON format
             * null: null
             * binary: false|true
             * number: NaN|-n..+n
             * text: UTF8
             * list: values|source⟳
             * query: { name: queryName, parameters: [ { name, value|source⟳, ... } ], <...future definitions> }
             * function: { name: PHPFunctionName, parameters: [ { name, value|source⟳, ... } ], <...future definitions> }
             * reference: name, source⟳
             * <...future definitions>
             */
            $table->text('default');

            $table->unsignedBigInteger('CreatedBy');
            $table->timestamp('CreatedAt')->useCurrent();
            $table->unsignedBigInteger('UpdatedBy');
            $table->timestamp('UpdatedAt')->useCurrent();
            $table->timestamp('DeletedAt')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('memberforms_test_sources');
    }
}
