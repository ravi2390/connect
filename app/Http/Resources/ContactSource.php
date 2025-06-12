<?php

namespace App\Http\Resources;

class ContactSource extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [

        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'ContactSourceId',
            'ContactSourceName',
            'DisplayOrder',
        ];
    }
}
