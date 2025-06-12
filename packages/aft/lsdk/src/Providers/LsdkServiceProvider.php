<?php

namespace Aft\Lsdk\Providers;

use Illuminate\Support\ServiceProvider;

class LsdkServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    #[\Override]
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__.'/../../config/lsdk.php', 'lsdk');
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot(): void
    {
        $this->loadRoutesFrom(__DIR__.'/../../routes/web.php');
        $this->loadRoutesFrom(__DIR__.'/../../routes/api.php');
        $this->loadViewsFrom(__DIR__.'/../../resources/views', 'lsdk');

        // Copied Directory /packages/aft/lsdk/public To /public/vendor/lsdk
        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__.'/../../public' => public_path('vendor/lsdk'),
            ], 'lsdk-assets');
        }
    }
}
