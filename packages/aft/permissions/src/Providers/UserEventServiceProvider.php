<?php

namespace Aft\Permissions\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class UserEventServiceProvider extends ServiceProvider
{
    protected $listen = [
        //
    ];

    protected $subscribe = [
        \Aft\Permissions\Listeners\UserEventSubscriber::class,
    ];
}
