<?php

namespace App\Http\Resources;

class AffiliateDesignation extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [

        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'AffiliateDesignationId',
            'AffiliateDesignationName',
        ];
    }
}
