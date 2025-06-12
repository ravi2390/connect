<?php

namespace Aft\Legacy\Console;

use Illuminate\Foundation\Console\QueuedCommand as DefaultQueuedCommand;

class QueuedCommand extends DefaultQueuedCommand
{
    /**
     * Set the job display name to the affiliate number from the command.
     *
     * @return string
     */
    #[\Override]
    public function displayName()
    {
        if (preg_match('|^legacy:migrate +([^ ]+)|i', (string) $this->data[0], $matches)) {
            return $matches[1];
        } else {
            return 'Unknown affiliate number';
        }
    }
}
