<?php

namespace Aft\SSRS;

use Aft\SSRS\Commands\SSRSCommands;
use Aft\SSRS\Http\Middleware\StartApiSession;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Routing\Router;
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
        $this->mergeConfigFrom(__DIR__.'/../config/ssrs.php', 'ssrs');
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot(): void
    {
        $this->registerCommands();
        $this->registerMiddleware();
        $this->registerRoutes();
        // $this->loadMigrationsFrom(__DIR__ . '/../database/migrations');
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'ssrs');
    }

    private function registerCommands(): void
    {
        if ($this->app->runningInConsole()) {
            $this->commands([
                SSRSCommands::class,
            ]);
        }
    }

    private function registerMiddleware(): void
    {
        /* @var Router $router */
        $router = $this->app->make(Router::class);
        $router->middlewareGroup('ssrs', [
            EncryptCookies::class,
            AddQueuedCookiesToResponse::class,
            StartApiSession::class,
        ]);
    }

    private function registerRoutes(): void
    {
        Route::namespace('Aft\SSRS')
            ->prefix(config('ssrs.uri.web'))
            ->middleware(config('ssrs.middleware.web'))
            ->group(function (): void {
                $this->loadRoutesFrom(__DIR__.'/../routes/web.php');
            });
        Route::namespace('Aft\SSRS')
            ->prefix(config('ssrs.uri.api'))
            ->middleware(config('ssrs.middleware.api'))
            ->group(function (): void {
                $this->loadRoutesFrom(__DIR__.'/../routes/api.php');
            });
    }
}
