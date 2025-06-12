<?php

namespace App\Http\Resources;

class ContactStatus extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [];
    }

    protected function getSimpleFields(): array
    {
        return [
            'ContactStatusId',
            'ContactStatusName',
        ];
    }
}
