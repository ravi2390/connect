<?php

return [
    'alerts' => [
        'database' => [
            'available' => [
                'channel' => 'slack-db-info',
                'level' => 'info',
                'message' => '<!test_account> The database server is now reachable.',
            ],
            'unavailable' => [
                'channel' => 'slack-db-alert',
                'level' => 'emergency',
                'message' => '<!test_account> The database server is unreachable!',
            ],
        ],
    ],
];
