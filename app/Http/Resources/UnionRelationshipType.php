<?php

namespace App\Http\Resources;

class UnionRelationshipType extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [];
    }

    protected function getSimpleFields(): array
    {
        return [
            'UnionRelationshipTypeId',
            'UnionRelationshipTypeName',
        ];
    }
}
