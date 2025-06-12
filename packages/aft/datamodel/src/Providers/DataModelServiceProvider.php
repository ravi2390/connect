<?php

namespace Aft\DataModel\Providers;

use Aft\DataModel\Commands\CleanDataModel;
use Aft\DataModel\Commands\CreateFiles;
use Illuminate\Support\ServiceProvider;

class DataModelServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    #[\Override]
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot(): void
    {
        $packageConfigPath = __DIR__.'/../../config/datamodel.php';
        $this->publishes([
            $packageConfigPath => config_path('datamodel.php'),
        ]);
        $this->mergeConfigFrom(
            $packageConfigPath,
            'datamodel'
        );

        if ($this->app->runningInConsole()) {
            $this->commands([
                CleanDataModel::class,
                CreateFiles::class,
            ]);
        }
    }
}
