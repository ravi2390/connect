<?php

namespace App\Http\Resources;

class CommitteeMemberType extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [

        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'CommitteeMemberTypeId',
            'CommitteeMemberTypeName',
        ];
    }
}
