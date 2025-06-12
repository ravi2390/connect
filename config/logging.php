<?php

use Monolog\Processor\PsrLogMessageProcessor;
use Monolog\Handler\NullHandler;
use Monolog\Handler\StreamHandler;
use Monolog\Handler\SyslogUdpHandler;

return [

    'deprecations' => env('LOG_DEPRECATIONS_CHANNEL', 'null'),

    'channels' => [
        'slack-web-info' => [
            'driver' => 'slack',
            'url' => env('LOG_SLACK_WEBHOOK_WEB_URL'),
            'username' => 'Laravel Log',
            'emoji' => ':bowtie:',
            'level' => 'info',
        ],

        'slack-web-alert' => [
            'driver' => 'slack',
            'url' => env('LOG_SLACK_WEBHOOK_WEB_URL'),
            'username' => 'Laravel Log',
            'emoji' => ':boom:',
            'level' => 'info',
        ],

        'slack-db-info' => [
            'driver' => 'slack',
            'url' => env('LOG_SLACK_WEBHOOK_DATABASE_URL'),
            'username' => 'Laravel Log',
            'emoji' => ':bowtie:',
            'level' => 'info',
        ],

        'slack-db-alert' => [
            'driver' => 'slack',
            'url' => env('LOG_SLACK_WEBHOOK_DATABASE_URL'),
            'username' => 'Laravel Log',
            'emoji' => ':boom:',
            'level' => 'info',
        ],

        'customlog' => [
            'driver' => 'single',
            'path' => storage_path('logs/custom.log'),
            'level' => 'debug',
        ],
    ],

];
