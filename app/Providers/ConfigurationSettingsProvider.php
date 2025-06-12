<?php

namespace App\Providers;

use App\UI\Provider\Decorator\PreloadedConfiguration;
use App\UI\Provider\Decorator\UserSavedConfiguration;
use App\UI\Provider\Facade\ConfigurationProvider;
use App\UI\Provider\Type\DefaultModelProvider;
use Illuminate\Support\ServiceProvider;

class ConfigurationSettingsProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    #[\Override]
    public function register(): void
    {
        $this->app->bind(ConfigurationProvider::class, fn($app): \App\UI\Provider\Facade\ConfigurationProvider => new ConfigurationProvider(new DefaultModelProvider(), new UserSavedConfiguration(), new PreloadedConfiguration(), request()));
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
