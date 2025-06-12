<?php

namespace Aft\AFTDB\Commands;

use Aft\AFTDB\SchemaLoader;
use Aft\AFTDB\SchemaSanitizer;
use Aft\AFTDB\SchemaValidator;
use Aft\AFTDB\SchemaWriter;
use Illuminate\Console\Command;

class SchemaCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'aftdb:schema {cmd}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'AFTDB schema control';

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
        $cmd = $this->argument('cmd');
        switch ($cmd) {
            case 'clean':
                SchemaLoader::clean();
                SchemaSanitizer::clean();
                SchemaValidator::clean();
                SchemaWriter::clean();
                break;
            case 'create':
                $datamodel = SchemaLoader::createFrom(null, $this);
                $datamodel = SchemaSanitizer::sanitize($datamodel, $this);
                $datamodel = SchemaValidator::validate($datamodel, $this);
                SchemaWriter::write($datamodel, null, $this);
                break;
            default:
                $this->error('Unknown schema command "'.$cmd.'"');
                break;
        }
    }
}
