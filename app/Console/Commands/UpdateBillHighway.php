<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\BillHighway\BillHighwayController;
use Illuminate\Console\ConfirmableTrait;

class UpdateBillHighway extends Command
{
    use ConfirmableTrait;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bh:sync {time} {affiliate_id?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Updating BillHighway details';

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
     */
    public function handle(): int
    {
        if (! $this->confirmToProceed()) {
            return 1;
        }
        $time = $this->argument('time');
        $affiliate_id = $this->argument('affiliate_id') ?: '';
        $this->info('Updating BillHighway started...');
        $bh = new BillHighwayController();
        $bh->SyncIndividualBillHighway($time, $affiliate_id);
        return 0;
    }
}
