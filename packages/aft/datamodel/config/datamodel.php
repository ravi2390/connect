<?php

return [
    'base_path' => dirname(__DIR__),
    'cache' => [
        'path' => storage_path('aftdb/cache'),
    ],
    'spreadsheets' => [
        'path' => storage_path('aftdb/schema'),
    ],
    'templates' => [
        'path' => dirname(__DIR__).'/templates',
    ],
    'output' => [
        'models_path' => dirname(__DIR__).'/output/Models',
        'requests_path' => dirname(__DIR__).'/output/Requests',
        'controllers_path' => dirname(__DIR__).'/output/Controllers',
        'route_path' => dirname(__DIR__).'/output/routes',
        'nova_path' => dirname(__DIR__).'/output/Nova',
    ],
    'traits_path' => base_path('app/Models/Traits'),
    'resources_path' => base_path('app/Http/Resources'),
];
