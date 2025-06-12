<?php

return [

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
        'scheme' => 'https',
    ],

    'google_recaptcha' => [
        'enabled' => env('GOOGLE_RECAPTCHA_ENABLED'),
        'projectId' => env('GOOGLE_RECAPTCHA_PROJECT_ID'),
        'key' => env('GOOGLE_RECAPTCHA_PROJECT_KEY'),
        'apiKey' => env('GOOGLE_RECAPTCHA_PROJECT_API_KEY'),
    ],

    'membership' => [
        'domain' => env('DMC_BASE_URL'),
        'endpoint' => env('DMC_END_POINT'),
        'program_id' => env('DMC_PROGRAM_ID'),
        'api_key' => env('DMC_API_KEY'),
        'content_type' => 'application/json',
    ],

];
