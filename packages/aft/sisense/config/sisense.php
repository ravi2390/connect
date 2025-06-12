<?php

return [
    'connection' => [
        'url' => env('SISENSE_URL', 'localhost'),
        'role' => env('SISENSE_ROLE', 0),
        'group' => env('SISENSE_GROUP', 0),
        'user' => env('SISENSE_USER', 'default'),
        'password' => env('SISENSE_PASSWORD', 'default'),
        'secret' => env('SISENSE_SECRET', 'secret'),
        'verify' => env('SISENSE_VERIFY', true),
    ],
];
