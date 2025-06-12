<?php

namespace Aft\SSRS\Commands;

use Illuminate\Console\Command;
use Illuminate\Console\ConfirmableTrait;

class SSRSCommands extends Command
{
    use ConfirmableTrait;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ssrs {cmd*}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'SSRS Commands';

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
     * @return void|null
     */
    public function handle()
    {
        if (! $this->confirmToProceed()) {
            return;
        }

        $cmd = $this->argument('cmd');
        switch ($cmd[0]) {
            case 'test':
                $this->info('Testing...');
                //
                $this->info('Testing done.');
                break;
            default:
                $this->error('Unknown command "'.$cmd[0].'"');
                break;
        }

        return null;
    }
}
