<?php

namespace App\Http\Resources;

use App\Http\Resources\MergedOrganization as MergedOrganizationResource;

class AffiliateMergedOrganization extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'MergedOrganization',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'MergedOrganizationId',
        ];
    }

    protected function includeMergedOrganization(): \App\Http\Resources\MergedOrganization
    {
        return new MergedOrganizationResource($this->MergedOrganization);
    }
}
