<?php

return [
    'legacy' => [
        'driver' => 'sqlsrv',
        'url' => env('LEGACY_DATABASE_URL'),
        'host' => env('LEGACY_HOST', 'localhost'),
        'port' => env('LEGACY_PORT', '1433'),
        'database' => env('LEGACY_DATABASE', 'forge'),
        'username' => env('LEGACY_USERNAME', 'forge'),
        'password' => env('LEGACY_PASSWORD', ''),
        'charset' => 'utf8',
        'prefix' => '',
        'prefix_indexes' => true,
        'options' => [
            PDO::DBLIB_ATTR_STRINGIFY_UNIQUEIDENTIFIER => true,
            // 1001 is the value of PDO::SQLSRV_ATTR_QUERY_TIMEOUT. Give
            // --refresh-updated-dates plenty of time to rebuild the _legacy_mdates
            // table.
            1001 => 600,
        ],
    ],
    'stage' => [
        'driver' => 'sqlsrv',
        'url' => env('STAGE_DATABASE_URL'),
        'host' => env('STAGE_HOST', 'localhost'),
        'port' => env('STAGE_PORT', '1433'),
        'database' => env('STAGE_DATABASE', 'forge'),
        'username' => env('STAGE_USERNAME', 'forge'),
        'password' => env('STAGE_PASSWORD', ''),
        'charset' => 'utf8',
        'prefix' => '',
        'prefix_indexes' => true,
        'options' => [
            PDO::DBLIB_ATTR_STRINGIFY_UNIQUEIDENTIFIER => true,
        ],
    ],
];
