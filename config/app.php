<?php

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Facade;

return [


    'aliases' => Facade::defaultAliases()->merge([
        'Redis' => Illuminate\Support\Facades\Redis::class,
    ])->toArray(),

    'throttle' => [
        'admin' => env('APP_ADMIN_THROTTLE', 60),
        'user' => env('APP_USER_THROTTLE', 60),
    ],
];
