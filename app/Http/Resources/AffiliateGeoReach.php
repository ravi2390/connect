<?php

namespace App\Http\Resources;

class AffiliateGeoReach extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [

        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'AffiliateGeoReachId',
            'AffiliateGeoReachName',
            'DisplayOrder',
        ];
    }
}
