<?php

namespace App\Http\Resources;

class AffiliateAddressType extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [];
    }

    protected function getSimpleFields(): array
    {
        return [
            'AffiliateAddressTypeId',
            'AffiliateAddressTypeName',
        ];
    }
}
