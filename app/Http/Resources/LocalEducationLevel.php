<?php

namespace App\Http\Resources;

class LocalEducationLevel extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'LocalEducationLevelId',
            'LocalEducationLevelName',
        ];
    }
}
