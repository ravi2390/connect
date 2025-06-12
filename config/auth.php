<?php

return [

    'guards' => [
        'api' => [
            'driver' => 'passport',
            'provider' => 'users',
            'hash' => false,
        ],
    ],

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'password_expire_days' => null,
            'throttle' => 60,
        ],
    ],

];
