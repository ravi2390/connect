<?php

namespace Aft\Legacy\Console;

use Illuminate\Foundation\Console\Kernel;

class AftKernel extends Kernel
{
    /**
     * Queue the given console command.
     *
     * @param  string  $command
     * @return \Illuminate\Foundation\Bus\PendingDispatch
     */
    #[\Override]
    public function queue($command, array $parameters = [])
    {
        // Use our version of QueuedCommand to set the job display name.
        return QueuedCommand::dispatch(func_get_args());
    }
}
