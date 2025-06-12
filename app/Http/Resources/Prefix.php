<?php

namespace App\Http\Resources;

class Prefix extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [];
    }

    protected function getSimpleFields(): array
    {
        return [
            'PrefixId',
            'PrefixName',
        ];
    }
}
