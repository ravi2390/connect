<?php

namespace App\Http\Resources;

class AffiliateEmailType extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [];
    }

    protected function getSimpleFields(): array
    {
        return [
            'AffiliateEmailTypeId',
            'AffiliateEmailTypeName',
        ];
    }
}
