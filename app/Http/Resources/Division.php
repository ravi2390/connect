<?php

namespace App\Http\Resources;

class Division extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [

        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'DivisionId',
            'DivisionName',
        ];
    }
}
