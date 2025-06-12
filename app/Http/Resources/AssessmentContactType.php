<?php

namespace App\Http\Resources;

class AssessmentContactType extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [

        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'AssessmentContactTypeName',
            'AssessmentContactTypeId',
        ];
    }
}
