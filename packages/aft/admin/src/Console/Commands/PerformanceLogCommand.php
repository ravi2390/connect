<?php

namespace Aft\Admin\Console\Commands;

use Aft\Admin\Http\Controllers\PerformanceLogController;
use Illuminate\Console\Command;

class PerformanceLogCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'performance:log';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Log System Performance';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle(): void
    {
        PerformanceLogController::create();
    }
}
