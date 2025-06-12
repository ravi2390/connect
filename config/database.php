<?php

use Illuminate\Support\Str;

return [

    'connections' => [
        'sqlsrv' => [
            'driver' => 'sqlsrv',
            'url' => env('DB_URL'),
            'host' => env('DB_HOST', 'localhost'),
            'port' => env('DB_PORT', '1433'),
            'database' => env('DB_DATABASE', 'forge'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'charset' => 'utf8',
            'prefix' => 'laravel_',
            'prefix_indexes' => true,
            'trust_server_certificate' => in_array(env('APP_ENV', 'local'), ['local', 'testing', 'development'], true) ? true : false,
            'options' => [
                PDO::DBLIB_ATTR_STRINGIFY_UNIQUEIDENTIFIER => true,
            ],
            // 'encrypt' => env('DB_ENCRYPT', 'yes'),
            // 'trust_server_certificate' => env('DB_TRUST_SERVER_CERTIFICATE', 'false'),
        ],

        'aftdb' => [
            'driver' => 'sqlsrv',
            'url' => env('AFTDB_DATABASE_URL'),
            'host' => env('AFTDB_HOST', 'localhost'),
            'port' => env('AFTDB_PORT', '1433'),
            'database' => env('AFTDB_DATABASE', 'forge'),
            'username' => env('AFTDB_USERNAME', 'forge'),
            'password' => env('AFTDB_PASSWORD', ''),
            'charset' => 'utf8',
            'prefix' => '',
            'prefix_indexes' => true,
            'trust_server_certificate' => in_array(env('APP_ENV', 'local'), ['local', 'testing', 'development'], true) ? true : false,
            'options' => [
                PDO::DBLIB_ATTR_STRINGIFY_UNIQUEIDENTIFIER => true,
            ],

        ],

        'member' => [
            'driver' => 'sqlsrv',
            'url' => env('MEMBER_DATABASE_URL'),
            'host' => env('MEMBER_HOST', 'localhost'),
            'port' => env('MEMBER_PORT', '1433'),
            'database' => env('MEMBER_DATABASE', 'forge'),
            'username' => env('MEMBER_USERNAME', 'forge'),
            'password' => env('MEMBER_PASSWORD', ''),
            'charset' => 'utf8',
            'prefix' => '',
            'prefix_indexes' => true,
            'trust_server_certificate' => in_array(env('APP_ENV', 'local'), ['local', 'testing', 'development'], true) ? true : false,
            'options' => [
                PDO::DBLIB_ATTR_STRINGIFY_UNIQUEIDENTIFIER => true,
            ],

        ],
    ],

    'migrations' => [
        'table' => 'migrations',
        'update_date_on_publish' => false, // disable to preserve original behavior for existing applications
    ],

];
