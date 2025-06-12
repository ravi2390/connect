<?php

namespace Aft\MemberForms;

use Aft\MemberForms\Commands\MemberFormsCommands;
use Aft\MemberForms\Commands\UpstreamCommands;
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
        $this->mergeConfigFrom(__DIR__.'/../config/memberforms.php', 'memberforms');
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot(): void
    {
        $this->registerCommands();
        $this->registerPrivateRoutes();
        $this->registerPublicRoutes();
        $this->loadMigrationsFrom(__DIR__.'/../database/migrations');
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'memberforms');
    }

    private function registerCommands(): void
    {
        if ($this->app->runningInConsole()) {
            $this->commands([
                MemberFormsCommands::class,
                UpstreamCommands::class,
            ]);
        }
    }

    private function registerPrivateRoutes(): void
    {
        Route::namespace('Aft\MemberForms')
            ->prefix(config('memberforms.uri.private.web'))
            ->middleware(config('memberforms.middleware.private.web'))
            ->group(function (): void {
                $this->loadRoutesFrom(__DIR__.'/../routes/private/web.php');
            });
        Route::namespace('Aft\MemberForms')
            ->prefix(config('memberforms.uri.private.api'))
            ->middleware(config('memberforms.middleware.private.api'))
            ->group(function (): void {
                $this->loadRoutesFrom(__DIR__.'/../routes/private/api.php');
            });
    }

    private function registerPublicRoutes(): void
    {
        Route::namespace('Aft\MemberForms')
            ->prefix(config('memberforms.uri.public.web'))
            ->middleware(config('memberforms.middleware.public.web'))
            ->group(function (): void {
                $this->loadRoutesFrom(__DIR__.'/../routes/public/web.php');
            });
        Route::namespace('Aft\MemberForms')
            ->prefix(config('memberforms.uri.public.api'))
            ->middleware(config('memberforms.middleware.public.api'))
            ->group(function (): void {
                $this->loadRoutesFrom(__DIR__.'/../routes/public/api.php');
            });
    }
}
