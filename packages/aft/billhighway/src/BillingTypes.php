<?php

namespace Aft\BillHighway;

class BillingTypes extends BaseBillHighway
{
    public function __construct()
    {
    }

    public static function GetBillingTypes(string $GroupId): mixed
    {
        $configCloud = config('billhighway.endpoints.cloud');

        return self::getResponseFromBillHighway(
            'cloud',
            'GET',
            $configCloud['apis']['GetBillingTypes'].'?groupid='.$GroupId,
            null
        );
    }

    public static function GetRecurringBillingTypes(string $GroupId): mixed
    {
        $configCloud = config('billhighway.endpoints.cloud');

        return self::getResponseFromBillHighway(
            'cloud',
            'GET',
            $configCloud['apis']['GetRecurringBillingTypes'].'?groupid='.$GroupId,
            null
        );
    }
}
