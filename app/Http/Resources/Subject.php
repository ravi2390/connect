<?php

namespace App\Http\Resources;

class Subject extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [

        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'SubjectId',
            'SubjectGuid',
            'SubjectName',
            'AffiliateId',
        ];
    }
}
