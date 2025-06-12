<?php

namespace App\Http\Resources;

class AffiliateType extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [];
    }

    protected function getSimpleFields(): array
    {
        return [
            'AffiliateTypeId',
            'AffiliateTypeName',
        ];
    }
}
