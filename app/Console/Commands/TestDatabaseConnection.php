<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class TestDatabaseConnection extends Command
{
    protected $signature = 'db:test';
    protected $description = 'Test database connection';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle(): void
    {
        try {
            DB::connection()->getPdo();
            if (DB::connection()->getDatabaseName()) {
                $this->info('Connected to the database: ' . DB::connection()->getDatabaseName());
            }
        } catch (\Exception $e) {
            $this->error('Could not connect to the database. Please check your configuration. Error: ' . $e->getMessage());
        }
    }
}
