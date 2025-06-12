<?php

namespace App\Http\Resources;

class MergedOrganization extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [];
    }

    protected function getSimpleFields(): array
    {
        return [
            'MergedOrganizationId',
            'MergedOrganizationCode',
            'MergedOrganizationName',
        ];
    }
}
