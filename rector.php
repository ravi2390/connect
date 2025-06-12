<?php

declare(strict_types=1);

use Rector\Config\RectorConfig;

return RectorConfig::configure()
    ->withPaths([
        __DIR__ . '/app',
        __DIR__ . '/bootstrap',
        __DIR__ . '/config',
        __DIR__ . '/packages',
        __DIR__ . '/resources',
        __DIR__ . '/routes',
        __DIR__ . '/scripts',
        __DIR__ . '/tests',
    ])
    ->withSkip([
        '*/public/*',
        '*/vendor/*',
    ])
    ->withPhpSets(php83: TRUE)
    ->withPreparedSets(typeDeclarations: true);
