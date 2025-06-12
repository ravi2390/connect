<?php

namespace Aft\BillHighway\Providers;

use Illuminate\Support\ServiceProvider;

class BillHighwayServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    #[\Override]
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__.'/../../config/billhighway.php', 'billhighway');
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
    }
}
