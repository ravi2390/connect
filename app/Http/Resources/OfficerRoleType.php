<?php

namespace App\Http\Resources;

class OfficerRoleType extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'OfficerRoleTypeId',
            'OfficerRoleTypeName',
        ];
    }
}
