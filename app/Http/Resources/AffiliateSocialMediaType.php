<?php

namespace App\Http\Resources;

class AffiliateSocialMediaType extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [];
    }

    protected function getSimpleFields(): array
    {
        return [
            'AffiliateSocialMediaTypeId',
            'AffiliateSocialMediaTypeName',
        ];
    }
}
