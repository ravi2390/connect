<?php

namespace App\Http\Resources;

class EntityType extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [];
    }

    protected function getSimpleFields(): array
    {
        return [
            'EntityTypeId',
            'EntityTypeName',
        ];
    }
}
