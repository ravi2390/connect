<?php

namespace App\Http\Resources;

class MaritalStatus extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [];
    }

    protected function getSimpleFields(): array
    {
        return [
            'MaritalStatusId',
            'MaritalStatusName',
        ];
    }
}
