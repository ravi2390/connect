<?php

namespace Aft\Admin\Providers;

use Aft\Admin\Console\Commands\PerformanceLogCommand;
use Aft\Admin\Console\Commands\Tokenizer;
use Illuminate\Support\ServiceProvider;

class AdminServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    #[\Override]
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__.'/../../config/admin.php', 'admin');
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__.'/../../database/migrations');
        $this->loadRoutesFrom(__DIR__.'/../../routes/web.php');
        $this->loadRoutesFrom(__DIR__.'/../../routes/api.php');
        $this->loadViewsFrom(__DIR__.'/../../resources/views', 'admin');
        if ($this->app->runningInConsole()) {
            $this->commands([
                PerformanceLogCommand::class,
                Tokenizer::class,
            ]);
        }
    }
}
