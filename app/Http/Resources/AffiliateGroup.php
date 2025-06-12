<?php

namespace App\Http\Resources;

class AffiliateGroup extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [

        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'AffiliateGroupId',
            'AffiliateGroupName',
        ];
    }
}
