<?php

namespace App\Http\Resources;

class Action extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'SubmittedByIndividualId',
            'Individual',
            'IndividualQuickComment',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'ActionId',
            'SubmittedById',
            'IndividualId',
            'IndividualQuickCommentId',
            'Action1',
            'Action2',
            'Action3',
            'Action4',
            'Action5',
            'ActionDate',
        ];
    }

    protected function includeSubmittedByIndividualId(): \App\Http\Resources\Individual
    {
        return new Individual($this->SubmittedByIndividualId);
    }
}
