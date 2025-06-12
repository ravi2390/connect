<?php

namespace Aft\MuseApi;

use Aft\MuseApi\Console\SetSecret;
use Illuminate\Support\ServiceProvider;

class MuseApiServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        if ($this->app->runningInConsole()) {
            $this->commands([
                SetSecret::class,
            ]);
        }
    }
}
