<?php

namespace App\Http\Resources;

class CommitteeType extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [

        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'CommitteeTypeId',
            'CommitteeTypeName',
        ];
    }
}
