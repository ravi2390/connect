<?php

$connections = [
    'legacy' => [
        'from' => [
            'host' => '127.0.0.1',
            'Database' => 'AFT_CDB',
            'UID' => 'sandbox_connectapi',
            'PWD' => '',
            'ReturnDatesAsStrings' => true,
            'ApplicationIntent' => 'ReadOnly',
            // Required to avoid string truncation errors.
            'CharacterSet' => 'UTF-8',
        ],
        'to' => [
            'host' => '127.0.0.1',
            'Database' => 'AFT_CDB_sanitized',
            'UID' => 'sa',
            'PWD' => '',
            'CharacterSet' => 'UTF-8',
        ],
    ],
    'activity' => [
        'from' => [
            'host' => '127.0.0.1',
            'Database' => 'AFTActivityDB',
            'UID' => 'sandbox_connectapi',
            'PWD' => '',
            'ReturnDatesAsStrings' => true,
            'ApplicationIntent' => 'ReadOnly',
            'CharacterSet' => 'UTF-8',
        ],
    ],
    'audit' => [
        'from' => [
            'host' => '127.0.0.1',
            'Database' => 'AffAudit',
            'UID' => 'sandbox_connectapi',
            'PWD' => '',
            'ReturnDatesAsStrings' => true,
            'ApplicationIntent' => 'ReadOnly',
            'CharacterSet' => 'UTF-8',
        ],
    ],
    'stage' => [
        'from' => [
            'host' => '127.0.0.1',
            'Database' => 'AFT_CDB_STAGE',
            'UID' => 'sandbox_connectapi',
            'PWD' => '',
            'ReturnDatesAsStrings' => true,
            'ApplicationIntent' => 'ReadOnly',
            'CharacterSet' => 'UTF-8',
        ],
    ],
    'survey' => [
        'from' => [
            'host' => '127.0.0.1',
            'Database' => 'Survey',
            'UID' => 'sandbox_connectapi',
            'PWD' => '',
            'ReturnDatesAsStrings' => true,
            'ApplicationIntent' => 'ReadOnly',
            'CharacterSet' => 'UTF-8',
        ],
    ],
];

// Sanitize other tables into the same DB as legacy tables.
$connections['stage']['to'] = $connections['legacy']['to'];

return $connections;
