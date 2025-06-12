<?php

namespace App\Http\Resources;

class OfficerRoleTitle extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'officerRoleType',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'OfficerRoleTitleId',
            'OfficerRoleTitleName',
            'OfficerRoleTypeId',
            'DisplayOrder',
        ];
    }

    protected function includeOfficerRoleType(): \App\Http\Resources\OfficerRoleType
    {
        return new OfficerRoleType($this->officerRoleType);
    }
}
