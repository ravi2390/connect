<?php

namespace Aft\Sisense\Providers;

use Aft\Sisense\Commands\SisenseExampleCommand;
use Illuminate\Support\ServiceProvider;

class SisenseServiceProvider extends ServiceProvider
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
        $packageConfigPath = __DIR__.'/../../config/sisense.php';
        $this->publishes([
            $packageConfigPath => config_path('sisense.php'),
        ]);
        $this->mergeConfigFrom(
            $packageConfigPath,
            'sisense'
        );

        if ($this->app->runningInConsole()) {
            $this->commands([
                SisenseExampleCommand::class,
            ]);
        }
        $this->loadRoutesFrom(__DIR__.'/../../routes/api.php');
    }
}
