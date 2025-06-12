<?php

return [
    'connection' => [
        'endpoint' => env('SSRS_ENDPOINT', 'server'),
        'executionPath' => env('SSRS_EXECUTION_PATH', 'ReportExecution2005.asmx'),
        'servicePath' => env('SSRS_REPORT_SERVICE_PATH', 'ReportService2010.asmx'),
        'base' => env('SSRS_BASE', '/'),
        'username' => env('SSRS_USERNAME', 'user'),
        'password' => env('SSRS_PASSWORD', 'password'),
        'forceReconnect' => env('SSRS_FORCE_RECONNECT', false),
        'cache_wsdl_path' => null,
        'cache_wsdl_expiry' => 86400,
        'curl_options' => [CURLOPT_TIMEOUT => env('SSRS_TIMEOUT', 60)],
        'hijackActionUrls' => true,
    ],
    'mfp_connection' => [
        'endpoint' => env('SSRS_ENDPOINT', 'server'),
        'executionPath' => env('SSRS_EXECUTION_PATH', 'ReportExecution2005.asmx'),
        'servicePath' => env('SSRS_REPORT_SERVICE_PATH', 'ReportService2010.asmx'),
        'base' => env('SSRS_MFP_BASE', '/'),
        'username' => env('SSRS_USERNAME', 'user'),
        'password' => env('SSRS_PASSWORD', 'password'),
        'forceReconnect' => env('SSRS_FORCE_RECONNECT', false),
        'cache_wsdl_path' => null,
        'cache_wsdl_expiry' => 86400,
        'curl_options' => [CURLOPT_TIMEOUT => env('SSRS_TIMEOUT', 60)],
        'hijackActionUrls' => true,
    ],
    'uri' => [
        'web' => 'app/ssrs',
        'api' => 'api/v3/reports',
    ],
    'middleware' => [
        'web' => ['web', 'auth', 'ability:reports'],
        'api' => ['api', 'auth', 'ssrs', 'ability:reports'],
    ],
    'render' => [
        'postrender' => [
            '#//hq-sqldev01/ReportServer#' => '//127.0.0.10/',
        ],
    ],
];
