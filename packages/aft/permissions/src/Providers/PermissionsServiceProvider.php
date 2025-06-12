<?php

namespace Aft\Permissions\Providers;

use Aft\Permissions\Console\Commands\UserAbilities;
use Aft\Permissions\Http\Middleware\CheckForAbility;
use Illuminate\Routing\Router;
use Illuminate\Support\ServiceProvider;

class PermissionsServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    #[\Override]
    public function register(): void
    {
        $this->app->register(UserEventServiceProvider::class);
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot(): void
    {
        $router = $this->app->make(Router::class);
        $router->aliasMiddleware('ability', CheckForAbility::class);

        $this->loadMigrationsFrom(__DIR__.'/../../database/migrations');

        if ($this->app->runningInConsole()) {
            $this->commands([
                UserAbilities::class,
            ]);
        }
    }
}
