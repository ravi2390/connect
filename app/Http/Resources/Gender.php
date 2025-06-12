<?php

namespace App\Http\Resources;

class Gender extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [];
    }

    protected function getSimpleFields(): array
    {
        return [
            'GenderId',
            'GenderName',
        ];
    }
}
