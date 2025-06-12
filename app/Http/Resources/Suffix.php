<?php

namespace App\Http\Resources;

class Suffix extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [];
    }

    protected function getSimpleFields(): array
    {
        return [
            'SuffixId',
            'SuffixName',
        ];
    }
}
