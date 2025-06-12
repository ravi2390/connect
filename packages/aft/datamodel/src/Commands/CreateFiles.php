<?php

namespace Aft\DataModel\Commands;

use Aft\DataModel\DataModel;
use Aft\DataModel\DataModelLoader;
use Aft\DataModel\DataModelOutput;
use Aft\DataModel\DataModelValidator;
use Illuminate\Console\Command;
use Illuminate\Support\Composer;

class CreateFiles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'aftdb:create';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create or overwrite support files for AFTDB';

    /**
     * Create a new command instance.
     */
    public function __construct(private readonly Composer $composer)
    {
        parent::__construct();
    }

    /**
     * @var DataModel
     */
    private $dataModel;

    /**
     * Execute the console command.
     *
     * @return mixed
     *
     * @throws \Exception
     */
    public function handle(): null
    {
        $dml = new DataModelLoader();
        $dmv = new DataModelValidator();
        $dmo = new DataModelOutput();
        $this->dataModel = $dml->load(config('datamodel.spreadsheets.path'), config('datamodel.cache.path'));
        $this->dataModel = $dmv->validate($this->dataModel);
        $dmo->output($this->dataModel, $dmv->dag);
        $this->composer->dumpAutoloads();

        return null;
    }
}
