<?php

namespace App\Http\Resources;

class AffiliatePhoneType extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'AffiliatePhoneTypeId',
            'AffiliatePhoneTypeName',
        ];
    }
}
