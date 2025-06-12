<?php

return [
    'path' => dirname(__DIR__),
    'name' => 'Staff Portal',
    'uri' => [
        'web' => 'app/staff',
        'api' => 'api/staff',
    ],
    'middleware' => [
        'web' => ['web', 'auth', 'ability:staffportal'],
        'api' => ['api', 'auth:api', 'ability:staffportal'],
    ],
];
