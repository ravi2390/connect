<?php

namespace Aft\Legacy\Providers;

use Aft\Legacy\Commands\LegacyMigrate;
use Illuminate\Support\ServiceProvider;

class LegacyServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    #[\Override]
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__.'/../../config/database.connections.php', 'database.connections');
        $this->mergeConfigFrom(__DIR__.'/../../config/legacy.php', 'legacy');
        $this->mergeConfigFrom(__DIR__.'/../../config/rules.php', 'legacy');
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
                LegacyMigrate::class,
            ]);
        }
    }
}
