<?php

return [
    'path' => dirname(__DIR__),
    'storage' => [
        'prefix' => 'memberform_',
        'files' => 'private/memberform',
        'pdfs' => 'private/memberform/pdfs',
    ],
    'uri' => [
        'public' => [
            'web' => 'app/memberforms',
            'api' => 'api/v3/memberforms',
        ],
        'private' => [
            'web' => 'app/memberforms/admin',
            'api' => 'api/v3/memberforms/admin',
        ],
    ],
    'middleware' => [
        'public' => [
            'web' => ['web'],
            'api' => ['api'],
        ],
        'private' => [
            'web' => ['web', 'auth', 'ability:memberforms'],
            'api' => ['api', 'auth:api', 'ability:memberforms'],
        ],
    ],
];
