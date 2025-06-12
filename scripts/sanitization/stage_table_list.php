<?php

// This list will come from any tables referenced in the spreadsheets' SQL
// queries, or tables referenced by those tables via foreign key constraints.
// It is keyed by the name of the table to be copied/sanitized. The value is a
// list of string columns which do not need to be sanitized.
return [
    'BillTypeDuescategoryMapping' => [
        'BillingTypeId',
        'BillingTypename',
        'DuesAmount',
        'DuesCategoryName',
        'GroupID',
        'LocalDescription',
        'LocalFrequency',
        'LocalUnionNbr',
        'PaymentType',
        'StateDuesCategoryName',
    ],
    'Individual_BHForm' => [
        'BillHighwayReferenceId',
        'BillingTypeID',
        'BILLINGSTATECODE',
        'BILLINGZIPCODE',
        'ExternalID',
        'LocalUnionNbr',
        'MAILINGSTATECODE',
        'MAILINGZIPCODE',
        'MEMBERID',
        'Member_Status',
        'Member_TF',
        'PAYMENTMETHOD',
    ],
];
