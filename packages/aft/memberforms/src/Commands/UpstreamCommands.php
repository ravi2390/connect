<?php

namespace Aft\MemberForms\Commands;

use App\Http\Controllers\BillHighway\BillHighwayController;
use Illuminate\Console\Command;
use Illuminate\Console\ConfirmableTrait;

class UpstreamCommands extends Command
{
    use ConfirmableTrait;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mfp:upstream {cmd*}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Upstream process to update Billhighway';

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
        if (! $this->confirmToProceed()) {
            return;
        }

        $cmd = $this->argument('cmd');
        switch ($cmd[0]) {
            case 'memberId':
                $this->info('Upstream MemberId started...');
                $bh = new BillHighwayController();
                $bh->UpstreamMemberIds();
                break;
            default:
                $this->error('Unknown command "'.$cmd[0].'"');
                break;
        }
    }
}
