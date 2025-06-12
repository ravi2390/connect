<?php

return [
    'clientId' => env('BILLHIGHWAY_CLIENT_ID'),

    'endpoints' => [
        'securePayments' => [
            'baseurl' => env('BILLHIGHWAY_SECUREPAYMENTS_BASE_URL', 'https://securepayments.default.com'),
            'publishable_key' => env('BILLHIGHWAY_SECUREPAYMENTS_PUBLISHABLE_KEY'),
            'content_type' => 'application/json',
            'apis' => [
                'GetPaymentToken' => '/integrations/api/autopayaccount/charge/token',
            ],
        ],

        'cloud' => [
            'baseurl' => env('BILLHIGHWAY_CLOUD_BASE_URL', 'https://api.billhighway.com'),
            'public_key' => env('BILLHIGHWAY_CLOUD_PUBLIC_KEY'),
            'private_key' => env('BILLHIGHWAY_CLOUD_PRIVATE_KEY'),
            'content_type' => 'application/json',
            'apis' => [
                'GetBillingTypes' => '/invoices/billingTypes',
                'GetRecurringBillingTypes' => '/invoices/recurringInvoices',
                'SaveIndividual' => '/members',
                'GetBillHighwayStatus' => '/members/statusvalues',
                'DisableAutoPay' => '/payments/autopay/disable',
                'MapCCReferenceNoToIndividual' => '/payments/creditcard',
                'MapACHReferenceNoToIndividual' => '/payments/ach',
            ],
        ],

        'connect' => [
            'baseurl' => env('BILLHIGHWAY_CONNECT_BASE_URL', 'https://connect.billhighway.com'),
            'private_key' => env('BILLHIGHWAY_CONNECT_PRIVATE_KEY'),
            'content_type' => 'application/json',
            'apis' => [
                'GetIndividual' => '/v3/members/api/chapters/{chapterId}/members/{memberId}',
                'MapPaymentTokenToIndividual' => '/v3/members/api/chapters/{chapterId}/members/{memberId}/autopayaccount',
            ],
        ],
    ],
];

