<?php

namespace Aft\StaffBeta;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider as Provider;

class ServiceProvider extends Provider
{
    /**
     * Register services.
     *
     * @return void
     */
    #[\Override]
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__.'/../config/staffbeta.php', 'staffbeta');
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot(): void
    {
        $this->routes();
        $this->loadMigrationsFrom(__DIR__.'/../database/migrations');
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'staffbeta');
        if ($this->app->runningInConsole()) {
            $this->commands([
                // Command::class,
            ]);
        }
    }

    private function routes(): void
    {
        Route::namespace('Aft\StaffBeta')
            ->prefix(config('staffbeta.uri.web'))
            ->middleware(config('staffbeta.middleware.web'))
            ->group(function (): void {
                $this->loadRoutesFrom(__DIR__.'/../routes/web.php');
            });
        Route::namespace('Aft\StaffBeta')
            ->prefix(config('staffbeta.uri.api'))
            ->middleware(config('staffbeta.middleware.api'))
            ->group(function (): void {
                $this->loadRoutesFrom(__DIR__.'/../routes/api.php');
            });
    }
}
