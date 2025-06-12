<?php

namespace App\Http\Resources;

class IndividualSocialMediaType extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [];
    }

    protected function getSimpleFields(): array
    {
        return [
            'IndividualSocialMediaTypeId',
            'IndividualSocialMediaTypeName',
        ];
    }
}
