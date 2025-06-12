<?php

namespace Aft\Audit\Commands;

use Aft\Audit\Auditable;
use Illuminate\Console\Command;

class AuditControl extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'audit:status {status}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Configure audit status [show|enable|disable|clear]';

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
        $status = $this->argument('status');
        switch ($status) {
            case 'show':
                $this->info('Global auditing status: '.(Auditable::getGlobalAuditing() ? 'true' : 'false'));
                break;
            case 'enable':
                Auditable::setGlobalAuditing(true);
                $this->info('Global auditing enabled');
                break;
            case 'disable':
                Auditable::setGlobalAuditing(false);
                $this->info('Global auditing disabled');
                break;
            case 'clear':
                Auditable::clearGlobalAuditing();
                $this->info('Global auditing status cleared (default: true)');
                break;
        }
    }
}
