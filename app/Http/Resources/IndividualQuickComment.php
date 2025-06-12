<?php

namespace App\Http\Resources;

class IndividualQuickComment extends AbstractResource
{
    protected function getSimpleFields(): array
    {
        return [
            'IndividualQuickCommentId',
            'IndividualId',
            'IndividualQuickComment',
            'CommentDate',
            'SubmittedByIndividualId',
        ];
    }

    protected function getRelationshipFields(): array
    {
        return [
            'IndividualAssessment',
            'Action',
            'SubmittedByIndividual',
        ];
    }

    protected function includeIndividualAssessment(): \App\Http\Resources\IndividualAssessment
    {
        return new IndividualAssessment($this->IndividualAssessment);
    }

    protected function includeAction(): \App\Http\Resources\Action
    {
        return new Action($this->Action);
    }

    protected function includeSubmittedByIndividual(): \App\Http\Resources\Individual
    {
        return new Individual($this->SubmittedByIndividual);
    }
}
