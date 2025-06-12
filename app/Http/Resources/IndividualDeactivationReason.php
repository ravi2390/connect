<?php

namespace App\Http\Resources;

class IndividualDeactivationReason extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [];
    }

    protected function getSimpleFields(): array
    {
        return [
            'IndividualDeactivationReasonId',
            'IndividualDeactivationReasonName',
        ];
    }
}
