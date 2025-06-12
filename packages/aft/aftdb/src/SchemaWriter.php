<?php

namespace Aft\AFTDB;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class SchemaWriter
{
    private $command;

    /**
     * SchemaValidator constructor.
     */
    public function __construct(private readonly DataModel $dataModel, ?Command $command = null)
    {
        if (! $command) {
            $command = new class
            {
                public function info(string $msg): void
                {
                    echo $msg.PHP_EOL;
                }

                public function warn(string $msg): void
                {
                    echo $msg.PHP_EOL;
                }

                public function error(string $msg): void
                {
                    echo $msg.PHP_EOL;
                }
            };
        }
        $this->command = $command;
    }

    private function output($toPath = null): void
    {
        Storage::disk('aftdb')->put(config('aftdb.cache.json'), $this->dataModel->tablesToJSON(), 'private');
    }

    public static function clean(): void
    {
        Storage::disk('aftdb')->delete(config('aftdb.cache.json'));
    }

    public static function write(DataModel $datamodel, $toPath = null, ?Command $command = null): void
    {
        $writer = new SchemaWriter($datamodel, $command);
        $writer->output($toPath);
    }
}
