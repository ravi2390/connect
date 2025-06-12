<?php

namespace App\Console\Commands;

use App\Models\Individual;
use App\Services\Factories\IndividualStopReasonWorkflow;
use Illuminate\Console\Command;

class TriggerStopReason extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'trigger:stop {--individual=} {--stopReason=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Run a stop reason for arbitrary individual';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        if (empty($this->option('individual'))) {
            $this->error('IndividualId must be passed to the call.');
        }

        if (empty($this->option('stopReason'))) {
            $this->error('Stop reason must be passed to the call.');
        }

        $individual = Individual::query()->find((int) $this->option('individual'));

        //@todo: Workflow expects IndividualAffiliate as first argument, missing other arguments.
        resolve(IndividualStopReasonWorkflow::class)->createWorkflow($this->option('stopReason'))::run(
            individualAffiliate: $individual
        );
    }
}
