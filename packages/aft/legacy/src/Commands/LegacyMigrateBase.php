<?php

namespace Aft\Legacy\Commands;

use Aft\Audit\Auditable;
use Aft\Legacy\LegacyFlatData;
use DateTime;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Console\Command;
use Illuminate\Console\OutputStyle;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redis;
use Laravel\Telescope\Telescope;
use Symfony\Component\Console\Exception\InvalidOptionException;
use Symfony\Component\Console\Output\ConsoleOutput;

class LegacyMigrateBase extends Command
{
    /**
     * Class for mapping lookup tables.
     *
     * @var \Aft\Legacy\LegacyFlatData
     */
    protected $flatData;

    /**
     * Time the migration process started.
     *
     * @var Carbon
     */
    protected $startTime;

    /**
     * Time in HH:MM:SS format since migration began.
     *
     * @throws \Exception
     */
    protected function runtime(): string
    {
        return $this->startTime->diff(new DateTime())->format('%H:%I:%S');
    }

    /**
     * TRUE if the first date is later than the second date.
     */
    protected function moreRecent(string $date1, string $date2): bool
    {
        return strtotime($date1) > strtotime($date2);
    }

    /**
     * Common prefix to our migration commands.
     *
     * @return mixed
     *
     * @throws \Exception
     */
    public function handle(): void
    {
        if (Auth::loginUsingId(1, true) === false) {
            throw new AuthenticationException('Failed to authenticate user ID 1');
        }

        // Telescope will queue a log entry of every insert in memory. Don't!
        Telescope::stopRecording();

        // Auditing will complain about missing Individual parents
        // (IndividualAffiliate) which can't be created until the Individual
        // is created.
        Auditable::setGlobalAuditing(false);

        // Clear queued jobs so all can be requeued.
        if ($this->option('clear-queue')) {
            if (! $this->option('use-queue')) {
                throw new InvalidOptionException('--clear-queue may only be used with --use-queue');
            }
            // @todo Is there are a way to do this that doesn't assume Redis?
            Redis::connection()->del([
                'queues:legacy-migration',
                'queues:legacy-migration-high',
            ]);
        }

        // Override output so workers will output status from queued affiliates.
        $output = new ConsoleOutput();
        $this->setOutput(new OutputStyle($this->input, $output));

        $this->flatData = new LegacyFlatData();
        $this->flatData->loadMappings($this->option('refresh-cached-mappings'));

        $this->startTime = Carbon::now();
    }
}
