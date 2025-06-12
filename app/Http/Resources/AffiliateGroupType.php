<?php

namespace App\Http\Resources;

class AffiliateGroupType extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [

        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'AffiliateGroupTypeId',
            'AffiliateGroupTypeName',
        ];
    }
}
