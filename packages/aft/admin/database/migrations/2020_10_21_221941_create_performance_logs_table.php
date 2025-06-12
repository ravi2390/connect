<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePerformanceLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('performance_logs', function (Blueprint $table): void {
            $table->bigIncrements('id');
            $table->string('servergroup');
            $table->string('servername');
            $table->string('context');
            $table->string('type');
            $table->string('subtype')->nullable();
            $table->double('value');
            $table->timestamp('created_at')->useCurrent();
            $table->index('type');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('performance_logs');
    }
}
