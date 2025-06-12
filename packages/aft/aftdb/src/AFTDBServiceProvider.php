<?php

namespace Aft\AFTDB;

use Aft\AFTDB\Commands\SchemaCommand;
use Illuminate\Support\ServiceProvider;

class AFTDBServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    #[\Override]
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__.'/../config/filesystems.disks.php', 'filesystems.disks');
        $this->mergeConfigFrom(__DIR__.'/../config/aftdb.php', 'aftdb');
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot(): void
    {
        if ($this->app->runningInConsole()) {
            $this->commands([
                SchemaCommand::class,
            ]);
        }
    }
}
