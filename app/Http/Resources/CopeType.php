<?php

namespace App\Http\Resources;

class CopeType extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [];
    }

    protected function getSimpleFields(): array
    {
        return [
            'CopeTypeId',
            'CopeTypeName',
        ];
    }
}
