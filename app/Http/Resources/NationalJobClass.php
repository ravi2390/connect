<?php

namespace App\Http\Resources;

class NationalJobClass extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'NationalJobClassId',
            'NationalJobClassGuid',
            'NationalJobClassName',
            'NationalJobClassCode',
        ];
    }
}
