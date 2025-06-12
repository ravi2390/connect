<?php

namespace Aft\Legacy\Facades;

use Aft\Legacy\Console\AftKernel;
use Illuminate\Support\Facades\Artisan;

/**
 * @method static int handle(\Symfony\Component\Console\Input\InputInterface $input, \Symfony\Component\Console\Output\OutputInterface|null $output = null)
 * @method static int call(string $command, array $parameters = [], \Symfony\Component\Console\Output\OutputInterface|null $outputBuffer = null)
 * @method static \Illuminate\Foundation\Bus\PendingDispatch queue(string $command, array $parameters = [])
 * @method static array all()
 * @method static string output()
 * @method static void terminate(\Symfony\Component\Console\Input\InputInterface $input, int $status)
 *
 * @see \Illuminate\Contracts\Console\Kernel
 */
class AftArtisan extends Artisan
{
    /**
     * {@inheritDoc}
     */
    #[\Override]
    protected static function getFacadeAccessor()
    {
        // Override the kernel so we can override the QueuedCommand class.
        return AftKernel::class;
    }
}
