<?php

namespace App\Http\Resources;

class AffiliateOfficerRole extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'officerRoleTitle',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'AffiliateOfficerRoleId',
            'AffiliateOfficerRoleName',
            'AffiliateId',
            'OfficerRoleTitleId',
        ];
    }

    protected function includeOfficerRoleTitle(): \App\Http\Resources\OfficerRoleTitle
    {
        return new OfficerRoleTitle($this->officerRoleTitle);
    }
}
